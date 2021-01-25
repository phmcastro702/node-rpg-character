// VALIDATION
const Joi = require('joi');


// REGISTER VALIDATION
const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        username: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);

};

// LOGIN VALIDATION
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        rememberMe: Joi.string()
    });

    return schema.validate(data);

};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
