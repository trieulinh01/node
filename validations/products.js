const Joi = require("joi");
const productValidators = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  images: Joi.array().required(),
});
module.exports = productValidators;
