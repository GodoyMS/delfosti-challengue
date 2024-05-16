import Joi, { ObjectSchema } from 'joi';

const signUpUserSchemaValidation: ObjectSchema = Joi.object().keys({
   codWorker: Joi.string().required().min(1).max(40).messages({
      'string.base': 'CodWorker must be of type string',
      'string.min': 'Invalid CodWorker',
      'string.max': 'Invalid CodWorker',
      'string.empty': 'CodWorker is a required field',
   }),
   name: Joi.string().required().min(4).max(40).messages({
      'string.base': 'Name must be of type string',
      'string.min': 'Invalid Name',
      'string.max': 'Invalid Name',
      'string.empty': 'Name is a required field',
   }),
   password: Joi.string().required().min(4).max(40).messages({
      'string.base': 'Password must be of type string',
      'string.min': 'Invalid password',
      'string.max': 'Invalid password',
      'string.empty': 'Password is a required field',
   }),
   email: Joi.string().required().email().messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Email must be valid',
      'string.empty': 'Email is a required field',
   }),
   phone: Joi.string().required().messages({
      'string.base': 'Phone must be of type string',
      'string.empty': 'Phone is a required field',
   }),
   job: Joi.string().required().messages({
      'string.base': 'Job must be of type string',
      'string.empty': 'Job is a required field',
   }),

   rol: Joi.string().valid('Encargado', 'Vendedor', 'Delivery','Repartidor').required().messages({
      'string.base': 'rol must be of type string',
      'string.empty': 'rol is a required field',
      'any.only': 'Invalid value for rol',

   }),


});

export { signUpUserSchemaValidation };
