const Joi = require("joi");

const createDashboardSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
});

const updateDashboardSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string()
});

module.exports = {
    createDashboardSchema,
    updateDashboardSchema
};