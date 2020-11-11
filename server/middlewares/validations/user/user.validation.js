const { user } = require('./user.schema');

/**
 * Validate the input for creating a new user
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let validateUserInput = async (req, res, next) => {
  const value = await user.validate(req.body);
  if (value.error) {
    next({
      status: 400,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = {
  validateUserInput,
};
