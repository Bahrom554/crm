const Joi = require('joi');
const group = {
   create: Joi.object().keys({
      name: Joi.string().required(),
   })
}

module.exports = group;