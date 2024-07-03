const Joi = require('joi');
const authSchemas = {
    login: Joi.object().keys({
        username: Joi.string().required().max(128),
        password: Joi.string().required().max(128)
    }),
};
module.exports = authSchemas;
