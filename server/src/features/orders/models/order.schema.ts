import { IOrderDocument } from '@orders/interfaces/orderDocument.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const orderSchema: Schema = new Schema(
   {
      numberOrder: { type: Number,unique:true },
      productsList:  [{ type:mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      orderDate: { type: Date },
      receiptDate:{type:Date},
      dispatchDate:{type:Date},
      deliveryDate:{type:Date},
      sellerId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
      deliveryManId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
      state: { type: String},
      createdAt: { type: Date, default: Date.now() },
   },

);

const OrderModel: Model<IOrderDocument> = model<IOrderDocument>('Order', orderSchema, 'Order');
export { OrderModel };
