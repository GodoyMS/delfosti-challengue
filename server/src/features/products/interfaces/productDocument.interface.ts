import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

//SOLID INTERFACE SEGRETATION
export interface IProductDocument extends Document {
   _id: string | ObjectId;
   sku:string;
   name: string;
   type: string;
   tag:string;
   price:number;
   unit:string;
   createdAt:Date;

}
