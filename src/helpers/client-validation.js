const joi = require('joi')

// define validation schema
const postSchema = joi.object({
    name : joi
        .string()
        .min(3)
        .max(13)
        .required(),
    email : joi
        .string()
        .email({ tlds : { allow : ['com'] }})
        .required(),
    phone : joi
        .string()
        .required(),
    iban : joi
        .string()
        .required(),
    city : joi
        .string()
        .required(),
    cvv : joi
        .number()
        .required()
})

const patchSchema = joi.object({
    name : joi
        .string()
        .min(3)
        .max(13),
    email : joi
        .string()
        .email({ tlds : { allow : ['com'] }}),
    phone : joi
        .string(),
    iban : joi
        .string(),
    city : joi
        .string(),
    cvv : joi
        .number()
})

const postValidation = (data) => postSchema.validate(data).error
const patchValidation = (data) => patchSchema.validate(data).error
module.exports = { postValidation, patchValidation }