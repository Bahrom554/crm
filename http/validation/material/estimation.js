const Joi = require('joi');
const object = {
    create: Joi.object().keys({
        code: Joi.string().max(10).required(),
        unity: Joi.string().max(10).required(),
        amount: Joi.number().unsafe().optional().allow(null),
        cost: Joi.number().unsafe().optional().allow(null),
        object_id: Joi.number().unsafe().required(),
        type_id: Joi.number().unsafe().required()
    }),

    update: Joi.object().keys({
        code: Joi.string().max(10),
        unity: Joi.string(),
        amount: Joi.number().unsafe().optional().allow(null),
        cost: Joi.number().unsafe().optional().allow(null),
        object_id: Joi.number().unsafe(),
        type_id: Joi.number().unsafe()

    }),

    queryParams: Joi.object().keys({
        from: Joi.date().optional(),
        to: Joi.date().optional(),
        page: Joi.number().unsafe().optional().min(1),
        limit: Joi.number().unsafe().optional().min(1),
        search: Joi.string().optional().allow(null, ''),
        type_id: Joi.number().unsafe().optional(),
        object_id: Joi.number().unsafe().optional()
    }),

    materialId: Joi.object().keys({
        id: Joi.number().unsafe().required().min(1),
    }),
}

module.exports = object;