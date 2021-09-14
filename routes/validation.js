const Joi = require('joi')

//Register Validation
const  registerValidation = async (data) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    
    try {
        const validation = await schema.validateAsync(data);
        return validation;
    } catch (error) {
        res.send(error.details[0].message);
    }
}

const loginValidation = async (data) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    try {
        const validation = await schema.validateAsync(data);
        return validation;

    } catch (error) {
        res.send(error.details[0].message);
    }
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
