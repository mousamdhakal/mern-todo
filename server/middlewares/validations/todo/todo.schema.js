const joi = require('@hapi/joi');

// Validation rules for todo input
const schema = {
  todo: joi.object({
    _id: joi.string().max(255),
    todo: joi.string().max(1000).required(),
    completed: joi.boolean().required(),
    user: joi.string(),
    __v: joi.number(),
  }),
};

module.exports = schema;
