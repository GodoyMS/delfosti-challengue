import { IProductDocument } from '@products/interfaces/productDocument.interface';
import { model, Model, Schema } from 'mongoose';

const productSchema: Schema = new Schema(
   {
      sku: { type: String,unique:true },
      name: { type: String },
      type: { type: String },
      tag: { type: String },
      price: { type: Number },
      unit: { type: String },
      createdAt: { type: Date, default: Date.now() },
   },

);

const ProductModel: Model<IProductDocument> = model<IProductDocument>('Product', productSchema, 'Product');
export { ProductModel };
