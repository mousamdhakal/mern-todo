const joi = require('@hapi/joi');

// Rules for validating input for creating new user
const schema = {
  user: joi.object({
    first_name: joi.string().max(255).required(),
    last_name: joi.string().max(255).required(),
    email: joi.string().email().max(255).required(),
    // Password must contain at least 8 characters one letter and one number
    password: joi
      .string()
      .pattern(new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
      .message(
        'Password must contain at least 8 characters including one letter and one number'
      )
      .max(255)
      .required(),
    __v: joi.number(),
  }),
};

module.exports = schema;
