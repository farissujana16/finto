const Joi = require("joi");

const createTransactionSchema = Joi.object({
  userId: Joi.number().integer().required(),

  accountId: Joi.number().integer().required(),

  categoryId: Joi.number().integer().allow(null),

  amount: Joi.number().precision(2).positive().required(),

  transactionDate: Joi.date().required(),

  type: Joi.string().valid("income", "expense", "transfer").required(),

  description: Joi.string().allow("", null),

  toAccountId: Joi.number().integer().allow(null),
});

const updateTransactionSchema = Joi.object({
  userId: Joi.number().integer(),

  accountId: Joi.number().integer(),

  categoryId: Joi.number().integer().allow(null),

  amount: Joi.number().precision(2).positive(),

  transactionDate: Joi.date(),

  type: Joi.string().valid("income", "expense", "transfer"),

  description: Joi.string().allow("", null),

  toAccountId: Joi.number().integer().allow(null),
}).min(1);

module.exports = {
  createTransactionSchema,
  updateTransactionSchema,
};
