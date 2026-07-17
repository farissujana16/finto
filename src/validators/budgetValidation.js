const Joi = require("joi");

const createBudgetSchema = Joi.object({
  userId: Joi.number().integer().required(),

  categoryId: Joi.number().integer().required(),

  limitAmount: Joi.number().precision(2).min(0).required(),

  periodMonth: Joi.number().integer().min(1).max(12).required(),

  periodYear: Joi.number().integer().min(2000).required(),
});

const updateBudgetSchema = Joi.object({
  userId: Joi.number().integer(),

  categoryId: Joi.number().integer(),

  limitAmount: Joi.number().precision(2).min(0),

  periodMonth: Joi.number().integer().min(1).max(12),

  periodYear: Joi.number().integer().min(2000),
}).min(1);

module.exports = {
  createBudgetSchema,
  updateBudgetSchema,
};
