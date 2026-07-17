const Joi = require("joi");

const createAccountSchema = Joi.object({
  userId: Joi.number().integer().required(),
  name: Joi.string().max(50).required(),
  type: Joi.string()
    .valid("cash", "bank", "ewallet", "investment")
    .default("cash"),
  balance: Joi.number().precision(2).min(0).default(0),
  colorOne: Joi.string().max(20).required(),
  colorTwo: Joi.string().max(20).required(),
});

const updateAccountSchema = Joi.object({
  userId: Joi.number().integer(),
  name: Joi.string().max(50),
  type: Joi.string().valid("cash", "bank", "ewallet", "investment"),
  balance: Joi.number().precision(2).min(0),
  colorOne: Joi.string().max(20).required(),
  colorTwo: Joi.string().max(20).required(),
}).min(1);

module.exports = {
  createAccountSchema,
  updateAccountSchema,
};
