import Joi from "joi";

const postSchema = Joi.object({ 
    url: Joi.string().uri().required(), 
    description: Joi.string().allow('').optional() 
});

export default postSchema;