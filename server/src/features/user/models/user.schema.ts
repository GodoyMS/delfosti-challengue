import { IUserDocument } from '@user/interfaces/userDocument.interface';
import {  compare } from 'bcryptjs';
import { model, Model, Schema } from 'mongoose';

const authSchema: Schema = new Schema(
   {
      codWorker: { type: 'String',unique:true },
      email: { type: 'String' },
      name: { type: 'String' },
      phone: { type: 'String' },
      job: { type: 'String' },
      rol: { type: 'String' },
      password: { type: 'String' },
      createdAt: { type: Date, default: Date.now() },


   },
   {
      toJSON: {
         transform(_doc, ret) {
            delete ret.password;
            return ret;
         },
      },
   },
);


authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
   const hashedPassword: string = (this as IUserDocument).password!;
   return compare(password, hashedPassword);
};

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', authSchema, 'User');
export { UserModel };
