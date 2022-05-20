const Joi = require('joi')
const { joiPassword } = require('joi-password');

module.exports.registerSchema = Joi.object({
    username : Joi.string().min(6).max(13).alphanum().required(),
    email : Joi.string().email().required(),
    password : joiPassword.string().min(8).max(13).minOfUppercase(1).minOfNumeric(1).minOfSpecialCharacters(1).required(),
    repeat_password: Joi.ref('password')
})
module.exports.resetpassSchema = Joi.object({
    password : joiPassword.string().min(8).max(13).minOfUppercase(1).minOfNumeric(1).minOfSpecialCharacters(1).required(),
    repeat_password: Joi.ref('password'),
    email : Joi.string().email().required()
})













// post schema
module.exports.postStudentSchema = Joi.object({
    name : Joi.string().min(3).max(15).required(),
    email : Joi.string().email().required(),
    programId : Joi.number().required(),
    cityId : Joi.number().required()
})

module.exports.patchStudentSchema = Joi.object({
    name : Joi.string().min(3).max(15),
    email : Joi.string().email(),
    programId : Joi.number(),
    cityId : Joi.number()
})