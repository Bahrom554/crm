Joi = require('joi');
const CONST = require('../../utils/constants')
exports.xls = Joi.object().keys({
    type: Joi.string().valid(...CONST.xls_types).required()
})