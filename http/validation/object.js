const Joi = require('joi');
const object = {
   create: Joi.object().keys({
      name: Joi.string().required(),
      totalValue: Joi.number().unsafe().required(),
      contractNumber: Joi.string().required(),
      contractDate: Joi.date().required(),
      latitude: Joi.number().unsafe().optional().allow(null),
      longitude: Joi.number().unsafe().optional().allow(null),
      file_id: Joi.number().unsafe().optional().allow(null),
      // users: Joi.array().optional().allow(null,Joi.array().length(0)).items(Joi.number().unsafe())

   }),

   userAssign: Joi.object().keys({
      users: Joi.array().optional().allow(null,Joi.array().length(0)).items(Joi.number().unsafe())
   }),

   update: Joi.object().keys({
      name: Joi.string(),
      totalValue: Joi.number().unsafe(),
      contractNumber: Joi.string(),
      contractDate: Joi.date(),
      latitude: Joi.number().unsafe().optional().allow(null),
      longitude: Joi.number().unsafe().optional().allow(null),
      file_id: Joi.number().unsafe().optional().allow(null)

   }),

   queryParams: Joi.object().keys({
      from: Joi.date().optional(),
      to: Joi.date().optional(),
      page: Joi.number().unsafe().optional().min(1),
      limit: Joi.number().unsafe().optional().min(1),
      search: Joi.string().optional().allow(null, ''),
   }),

   objectId: Joi.object().keys({
      id: Joi.number().unsafe().required().min(1),
   }),
}

module.exports = object;