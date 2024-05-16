import Joi, { ObjectSchema } from 'joi';

const signUpProductSchemeValidation: ObjectSchema = Joi.object().keys({

   // SKU, Name,Type,Tag,price,unit
   sku: Joi.string().required().min(4). max(30).messages({
      'string.base': 'CodWorker must be of type string',
      'string.min': 'Invalid sku',
      'string.max': 'Invalid sku',
   }),
   name: Joi.string().required().min(2). max(30).messages({
      'string.base': 'Name must be of type string',
      'string.min': 'Invalid Name',
      'string.max': 'Invalid Name',
   }),
   type: Joi.string().required().min(2). max(50).messages({
      'string.base': 'Type must be of type string',
      'string.min': 'Invalid Type',
      'string.max': 'Invalid Type',
   }),
   tag: Joi.string().required().min(2). max(200).messages({
      'string.base': 'Tag must be of type string',
      'string.min': 'Invalid Tag',
      'string.max': 'Invalid Tag',
   }),
   price: Joi.number().required().min(2).messages({
      'string.base': 'Price must be of type number',
      'string.min': 'Invalid Price',
   }),
   unit: Joi.string().required().min(1). max(50).messages({
      'string.base': 'Unit must be of type string',
      'string.min': 'Invalid Unit',
      'string.max': 'Invalid Unit',
   }),
});

export { signUpProductSchemeValidation };
