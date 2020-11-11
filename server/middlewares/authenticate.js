const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Check the authentication token for protected routes and if found decode and embed the user info on request body
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let authenticateToken = function (req, res, next) {
  let token;
  // Get token from one of the headers
  if (req.headers['authorization']) token = req.headers['authorization'];
  if (req.headers['x-access-token']) token = req.headers['x-access-token'];
  if (req.headers['token']) token = req.headers['token'];

  // If token not found restrict access
  if (!token) {
    return next({
      message: 'Token Not Provided',
      status: 400,
    });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.JWTSECRETKEY, async function (err, decoded) {
    if (err) {
      return next(err);
    }

    // Get user from the decoded data of the token to check if the user still exists or not
    const result = await User.findOne({ email: decoded.result.email }).exec();

    if (!result) {
      next('User removed from system try logging in again');
    }

    // If user exists on the system, embed the data on the request body
    req.userId = decoded.result._id;
    next();
  });
};

module.exports = {
  authenticateToken,
};
