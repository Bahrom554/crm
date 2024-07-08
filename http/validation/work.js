const Joi = require('joi');
const object = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        unity: Joi.string().max(10).required(),
        amount: Joi.number().optional().allow(null),
        cost: Joi.number().optional().allow(null),
        object_id: Joi.number().required()
    }),

    update: Joi.object().keys({
        name: Joi.string(),
        unity: Joi.string(),
        amount: Joi.number().optional().allow(null),
        cost: Joi.number().optional().allow(null),
        object_id: Joi.number()

    }),

    queryParams: Joi.object().keys({
        from: Joi.date().optional(),
        to: Joi.date().optional(),
        page: Joi.number().optional().min(1),
        limit: Joi.number().optional().min(1),
        search: Joi.string().optional().allow(null, ''),
    }),

    workId: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
}

module.exports = object;