import Joi, { ObjectSchema } from 'joi';

const updateOrderStatusScheme: ObjectSchema = Joi.object().keys({

   state: Joi.string().valid('En proceso', 'En delivery','Recibido').required().messages({
      'string.base': 'Status must be of type string',
      'string.empty': 'Status is a required field',
      'any.only': 'Invalid value for Status',
   }),

});

export { updateOrderStatusScheme };
