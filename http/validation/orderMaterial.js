const Joi = require('joi');
const object = {
    create: Joi.object().keys({
        material_id: Joi.number().required(),
        supplier_id: Joi.number().required(),
        amount: Joi.number().unsafe().required(),
        cost: Joi.number().unsafe().required(),
        object_id: Joi.number().required()
    }),

    update: Joi.object().keys({
        material_id: Joi.number(),
        supplier_id: Joi.number(),
        amount: Joi.number().unsafe().optional().allow(null),
        cost: Joi.number().unsafe().optional().allow(null),
        object_id: Joi.number()

    }),

    queryParams: Joi.object().keys({
        from: Joi.date().optional(),
        to: Joi.date().optional(),
        page: Joi.number().optional().min(1),
        limit: Joi.number().optional().min(1),
        search: Joi.string().optional().allow(null, ''),
        material_id: Joi.number().optional(),
        object_id: Joi.number().optional(),
        supplier_id: Joi.number().optional(),
    }),

    materialId: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
}

module.exports = object;