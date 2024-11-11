const Joi = require('joi');
const object = {
   create: Joi.array().items(
      Joi.object().keys({
         name: Joi.string().required(),
         detail: Joi.string().allow('', null),
         count: Joi.number().unsafe().required(),
         cost: Joi.number().unsafe().optional().allow(null),
         file_id: Joi.number().unsafe().optional()
   
      })
   ),

   update: Joi.object().keys({
      name: Joi.string(),
      detail: Joi.string(),
      count: Joi.number().unsafe(),
      cost: Joi.number().unsafe(),
      file_id: Joi.number().unsafe().optional()

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