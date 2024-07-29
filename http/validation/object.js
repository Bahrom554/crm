const Joi = require('joi');
const object = {
   create: Joi.object().keys({
      name: Joi.string().required(),
      totalValue: Joi.number().required(),
      contractNumber: Joi.string().required(),
      contractDate: Joi.date().required(),
      latitude: Joi.number().optional().allow(null),
      longitude: Joi.number().optional().allow(null),
      file_id: Joi.number().optional().allow(null),
      // users: Joi.array().optional().allow(null,Joi.array().length(0)).items(Joi.number())

   }),

   userAssign: Joi.object().keys({
      users: Joi.array().optional().allow(null,Joi.array().length(0)).items(Joi.number())
   }),

   update: Joi.object().keys({
      name: Joi.string(),
      totalValue: Joi.number(),
      contractNumber: Joi.string(),
      contractDate: Joi.date(),
      latitude: Joi.number().optional().allow(null),
      longitude: Joi.number().optional().allow(null),
      file_id: Joi.number().optional().allow(null)

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