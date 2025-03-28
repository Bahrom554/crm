const Joi = require('joi');

const middleware = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property]);

        if (error == null) {
            //req[property] = value;
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            console.log('error', message);
            res.status(422).json({ error: message });
        }
    };
};

module.exports = middleware;
