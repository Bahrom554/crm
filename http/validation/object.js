const Joi = require('joi');
const object = {
   create: Joi.object().keys({
      name: Joi.string().required(),
      totalValue: Joi.number().required(),
      contractNumber: Joi.string().required(),
      contractDate: Joi.date().required(),
      password: Joi.string().min(6).required(),
      salary: Joi.number().optional().allow(null),
      comment: Joi.string().optional().allow(null, ''),
      role_id: Joi.number().optional().allow(null),
      files: Joi.array().optional().items(Joi
         .object().keys({
             id: Joi.number().required(),
             name: Joi.string().required(),
         })),


   }),

   update: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      midName: Joi.string(),
      phone: Joi.string().pattern(/^[0-9]+$/),
      username: Joi.string(),
      salary: Joi.number().optional().allow(null),
      comment: Joi.string().optional().allow(null, ''),
      role_id: Joi.number().optional().allow(null),
      password: Joi.string().min(8),
      files: Joi.array().optional().items(Joi
         .object().keys({
            id: Joi.number().required(),
            name: Joi.string().required(),
         })),

   }),

   queryParams: Joi.object().keys({
      from: Joi.date().optional(),
      to: Joi.date().optional(),
      page: Joi.number().optional().min(1),
      limit: Joi.number().optional().min(1),
      search: Joi.string().optional().allow(null, ''),
   }),

   objectId: Joi.object().keys({
      id: Joi.number().required().min(1),
   }),
}

module.exports = object;