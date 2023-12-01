const Joi = require("joi");
const categoriesValidators = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),
  slug: Joi.string().required(),
});
module.exports = categoriesValidators;
