const Joi = require('joi');

module.exports = {
    schemas: {
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        // Validaciones para usuarios nuevos
        userSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required()
        }),
        // Validaciones para usuarios ya existentes
        userSchemaUpdate: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email()
        }),
    },

    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = schema.validate({ param: req['params'][name] });
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};

                if (!req.value['params'])
                    req.value['params'] = {};

                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);

            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};

                if(!req.value['body'])
                    req.value['body'] = {};
                
                req.value['body'] = result.value;
                next();
            }
        }
    }

}
