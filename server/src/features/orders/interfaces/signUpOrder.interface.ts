import { ObjectId } from 'mongodb';
//SOLID INTERFACE SEGRETATION



export interface ISignUpOrder {
   _id: ObjectId;
   numberOrder:number;
   productsList:  Array<ObjectId | string>;
   sellerId:string | ObjectId;
   deliveryManId:string | ObjectId;
}
