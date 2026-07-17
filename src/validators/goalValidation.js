const Joi = require("joi");

const createGoalSchema = Joi.object({
  userId: Joi.number().integer().required(),

  name: Joi.string().max(100).required(),

  targetAmount: Joi.number().precision(2).min(0).required(),

  currentAmount: Joi.number().precision(2).min(0).default(0),

  deadline: Joi.date().allow(null),
});

const updateGoalSchema = Joi.object({
  userId: Joi.number().integer(),

  name: Joi.string().max(100),

  targetAmount: Joi.number().precision(2).min(0),

  currentAmount: Joi.number().precision(2).min(0),

  deadline: Joi.date().allow(null),
}).min(1);

module.exports = {
  createGoalSchema,
  updateGoalSchema,
};
