const Joi = require("joi");

const createCategoriesSchema = Joi.object({
  name: Joi.string().max(50).required(),
  type: Joi.string().valid("income", "expense").required(),
  icon: Joi.string().max(30).allow(null, ""),
  color: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .allow(null, ""),
});

const updateCategoriesSchema = Joi.object({
  name: Joi.string().max(50),
  type: Joi.string().valid("income", "expense"),
  icon: Joi.string().max(30).allow(null, ""),
  color: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .allow(null, ""),
}).min(1);

module.exports = {
  createCategoriesSchema,
  updateCategoriesSchema,
};
