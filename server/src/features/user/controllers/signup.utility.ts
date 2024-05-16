import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { config } from '@configs/configEnvs';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { ISignUpUser } from '@user/interfaces/signUpData.interface';

export abstract class SignUpUserUtility {
   protected signToken(data: IUserDocument, userObjectId: ObjectId): string {
      return JWT.sign(
         {
            userId: userObjectId,
            email: data.email,
            username: data.name,
         },
         config.JWT_TOKEN!,
      );
   }

   protected signUpUser(data:ISignUpUser):IUserDocument{
   const {_id,name,email,codWorker,rol,job,password,phone,}=data;
   return{
      _id,
      codWorker,
      name,
      email,
      phone,
      rol,
      job,
      password,
      createdAt:new Date()
   } as unknown as IUserDocument;

   }

}
