const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const User = require('../models/User');

/**
 * Create new user with given information
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const register = async (req, res, next) => {
  const user = req.body;

  // Hash the password to store in database
  const salt = genSaltSync(10);
  user.password = hashSync(user.password, salt);

  const newUser = new User(user);
  try {
    await newUser.save();

    res.status(200).json({
      message: 'User created successfully, login to get access',
      status: 200,
    });
  } catch (err) {
    next('Email already exists, try logging in or use another email');
  }
};

/**
 * Login user with provided email and password
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
const login = async (req, res, next) => {
  const user = req.body;

  const result = await User.findOne({ email: user.email }).exec();

  // If user with entered credentails does not exist
  if (!result) {
    next('Invalid email or password');
  } else {
    // Check if the password entered is correct
    const passwordResult = compareSync(user.password, result.password);
    if (passwordResult) {
      result.password = undefined;

      // Create new jsonwebtoken for user authorization
      const jsonwebtoken = sign({ result: result}, process.env.JWTSECRETKEY,{
        expiresIn: '1w'
      });
      return res.json({
        message: 'login successfully',
        token: jsonwebtoken,
        data: result,
        status: 200,
      });
    } else {
      return next('Invalid email or password');
    }
  }
};

module.exports = { register, login };
