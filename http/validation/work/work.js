const Joi = require('joi');
const object = {
    create: Joi.object().keys({
        estimation_id: Joi.number().required(),
        amount: Joi.number().unsafe().required(),
        cost: Joi.number().unsafe().required(),
        object_id: Joi.number().required(),
        comment: Joi.string().optional(),
        files: Joi.array().items(Joi.number()).required()
    }),

    update: Joi.object().keys({
        estimation_id: Joi.number(),
        amount: Joi.number().unsafe(),
        cost: Joi.number().unsafe(),
        object_id: Joi.number(),
        comment: Joi.string().optional(),
        files: Joi.array().items(Joi.number())
    }),

    queryParams: Joi.object().keys({
        from: Joi.date().optional(),
        to: Joi.date().optional(),
        page: Joi.number().optional().min(1),
        limit: Joi.number().optional().min(1),
        search: Joi.string().optional().allow(null, ''),
        estimation_id: Joi.number().optional(),
        object_id: Joi.number().optional(),
    }),

    id: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
}

module.exports = object;