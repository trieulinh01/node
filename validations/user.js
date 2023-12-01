const Joi = require("joi");

const createUserValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
module.exports = createUserValidator;
