import Joi, { ObjectSchema } from 'joi';

const singUpOrderScheme: ObjectSchema = Joi.object().keys({

   // numberOrder, productsList, sellerId, deliveryManId
   numberOrder: Joi.number().required().messages({
      'string.base': 'CodWorker must be of type number',
   }),
   productsList: Joi.array()
    .required()
    .min(1) // Ensure the array is not empty
    .max(40) // Set maximum length if needed
    .items(Joi.string()) // Specify that each item in the array must be a string
    .messages({
      'array.base': 'ProductsList must be of type array',
      'array.min': 'ProductsList must contain at least one item',
      'array.max': 'ProductsList must contain at most 40 items',
      'string.base': 'Each item in productsList must be of type string',
    }),
   sellerId: Joi.string().required().min(4).messages({
      'string.base': 'SellerId must be of type string',
      'string.min': 'Invalid SellerId',
      'string.empty': 'SellerId is a required field',
   }),
   deliveryManId: Joi.string().required().min(4).messages({
      'string.base': 'DeliveryManId must be of type string',
      'string.min': 'Invalid DeliveryManId',
      'string.empty': 'DeliveryManId is a required field',
   }),


});

export { singUpOrderScheme };
