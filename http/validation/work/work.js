const Joi = require('joi');
const object = {
    create: Joi.object().keys({
        estimation_id: Joi.number().unsafe().required(),
        amount: Joi.number().unsafe().required(),
        cost: Joi.number().unsafe().optional(),
        object_id: Joi.number().unsafe().required(),
        comment: Joi.string().optional(),
        worker_id: Joi.number().unsafe().required(),
        files: Joi.array().items(Joi.number().unsafe()).required()
    }),

    update: Joi.object().keys({
        estimation_id: Joi.number().unsafe(),
        amount: Joi.number().unsafe(),
        cost: Joi.number().unsafe(),
        object_id: Joi.number().unsafe(),
        comment: Joi.string().optional(),
        worker_id: Joi.number().unsafe().required(),
        files: Joi.array().items(Joi.number().unsafe())
    }),

    queryParams: Joi.object().keys({
        from: Joi.date().optional(),
        to: Joi.date().optional(),
        page: Joi.number().unsafe().optional().min(1),
        limit: Joi.number().unsafe().optional().min(1),
        search: Joi.string().optional().allow(null, ''),
        estimation_id: Joi.number().unsafe().optional(),
        object_id: Joi.number().unsafe().optional(),
    }),

    id: Joi.object().keys({
        id: Joi.number().unsafe().required().min(1),
    }),
}

module.exports = object;