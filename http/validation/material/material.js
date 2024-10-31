const Joi = require('joi');
const object = {
    create: Joi.object().keys({
        estimation_id: Joi.number().unsafe().optional(),
        name: Joi.string().when('estimation_id',{
            is: Joi.exist(),
            then: Joi.optional(),
			otherwise: Joi.required(),

        }),
        supplier_id: Joi.number().unsafe().required(),
        amount: Joi.number().unsafe().required(),
        object_id: Joi.number().unsafe().required()
    }),

    update: Joi.object().keys({
        estimation_id: Joi.number().unsafe(),
        name: Joi.string(),
        supplier_id: Joi.number().unsafe(),
        amount: Joi.number().unsafe().optional().allow(null),
        object_id: Joi.number().unsafe()

    }),

    queryParams: Joi.object().keys({
        from: Joi.date().optional(),
        to: Joi.date().optional(),
        page: Joi.number().unsafe().optional().min(1),
        limit: Joi.number().unsafe().optional().min(1),
        search: Joi.string().optional().allow(null, ''),
        estimation_id: Joi.number().unsafe().optional(),
        object_id: Joi.number().unsafe().optional(),
        supplier_id: Joi.number().unsafe().optional(),
    }),

    id: Joi.object().keys({
        id: Joi.number().unsafe().required().min(1),
    }),
}

module.exports = object;