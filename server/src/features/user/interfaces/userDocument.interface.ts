import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

//SOLID INTERFACE SEGRETATION
export interface IUserDocument extends Document {
   _id: string | ObjectId;
   codWorker:string;
   name: string;
   email: string;
   phone:string;
   job:string;
   rol:string;
   password: string;
   createdAt: Date;


   comparePassword(password: string): Promise<boolean>;
   hashPassword(password: string): Promise<string>;
}
