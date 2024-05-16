import { ObjectId } from 'mongodb';
//SOLID INTERFACE SEGRETATION



export interface ISignUpProduct {
   _id: ObjectId;
   sku:string;
   name:string;
   type:string;
   tag:string;
   price:number;
   unit:string;
}
