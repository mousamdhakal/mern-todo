const { todo } = require('./todo.schema');

/**
 * Validate the input for creating or updating todo
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let validateTodoInput = async (req, res, next) => {
  const value = await todo.validate(req.body);
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
  validateTodoInput,
};
