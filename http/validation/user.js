const Joi = require('joi');
const user = {
   create: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      midName: Joi.string().required(),
      phone: Joi.string().pattern(/^[0-9]+$/).required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
      salary: Joi.number().unsafe().optional().allow(null),
      comment: Joi.string().optional().allow(null, ''),
      role_id: Joi.number().unsafe().min(2).optional().allow(null),
      object_id: Joi.number().unsafe().optional().allow(null),
      files: Joi.array().optional().items(Joi
         .object().keys({
             id: Joi.number().unsafe().required(),
             name: Joi.string().required(),
         })),


   }),

   update: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      midName: Joi.string(),
      phone: Joi.string().pattern(/^[0-9]+$/),
      username: Joi.string(),
      salary: Joi.number().unsafe().optional().allow(null),
      comment: Joi.string().optional().allow(null, ''),
      role_id: Joi.number().unsafe().min(2).optional().allow(null),
      password: Joi.string().min(8),
      files: Joi.array().optional().items(Joi
         .object().keys({
            id: Joi.number().unsafe().required(),
            name: Joi.string().required(),
         })),

   }),

   queryParams: Joi.object().keys({
      from: Joi.date().optional(),
      to: Joi.date().optional(),
      page: Joi.number().unsafe().optional().min(1),
      limit: Joi.number().unsafe().optional().min(1),
      search: Joi.string().optional().allow(null, ''),
      role_id: Joi.number().unsafe().optional().min(1),
   }),

   userId: Joi.object().keys({
      id: Joi.number().unsafe().required().min(1),
   }),
}

module.exports = user;