import { Date, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

//SOLID INTERFACE SEGRETATION
export interface IOrderDocument extends Document {
   _id: string | ObjectId;
   numberOrder:number;
   productsList:  Array<ObjectId | string>;
   orderDate: Date;
   receiptDate?: Date;
   dispatchDate?: Date;
   deliveryDate?: Date;
   sellerId:string | ObjectId;
   deliveryManId:string | ObjectId;
   state:ORDERSTATUS;
   createdAt:Date;
}

export enum ORDERSTATUS {
   STATE1= 'Por atender',
   STATE2 = 'En proceso',
   STATE3 = 'En delivery',
   STATE4 = 'Recibido'
 }
