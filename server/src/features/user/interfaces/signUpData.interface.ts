import { ObjectId } from 'mongodb';
//SOLID INTERFACE SEGRETATION



export interface ISignUpUser {
   _id: ObjectId;
   codWorker:string;
   name:string;
   email: string;
   phone: string;
   job: string;
   rol:string;
   password:string;
}
