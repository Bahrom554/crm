const Joi = require('joi');
const object = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        unity: Joi.string().max(10).required(),
        amount: Joi.number().unsafe().optional().allow(null),
        cost: Joi.number().unsafe().optional().allow(null),
        object_id: Joi.number().unsafe().required(),
        type_id: Joi.number().unsafe().required()
    }),

    update: Joi.object().keys({
        name: Joi.string(),
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
        object_id: Joi.number().unsafe(),
        type_id: Joi.number().unsafe()
    }),

    workId: Joi.object().keys({
        id: Joi.number().unsafe().required().min(1),
    }),
}

module.exports = object;