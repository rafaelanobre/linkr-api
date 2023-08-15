import Joi from "joi";

export const schemasignup = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    photo: Joi.string().uri().required()
})

export const schemasignin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})