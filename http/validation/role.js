const Joi = require('joi');
const role = {
   update: Joi.object().keys({
      name: Joi.string(),
      comment: Joi.string(),
      permissions: Joi.array().optional().items(Joi.string())
   })
}

module.exports = role;