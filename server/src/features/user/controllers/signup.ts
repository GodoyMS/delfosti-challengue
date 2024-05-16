import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { Generators } from '@helpers/generators/generators';
import HTTP_STATUS from 'http-status-codes';
import { userService } from '@services/db/user.service';
import { SignUpUserUtility } from './signup.utility';
import { signUpUserSchemaValidation } from '@user/schemes/signup';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { UserPayload } from '@user/interfaces/authPayload.interface';

export class SignUp extends SignUpUserUtility {

   @joiValidation(signUpUserSchemaValidation)
   public async create(req: Request, res: Response): Promise<void> {
      const {codWorker,name,password,email,phone,job,rol } =
         req.body;

      const checkIfUserExist = await userService.checkUserByEmailOrCod({email,codWorker});

      if (checkIfUserExist) {
         throw new BadRequestError('Invalid credentials for this user');
      }
      const userObjectId: ObjectId = new ObjectId();
      const passwordHash = await Generators.hash(password);

      const userData: IUserDocument = SignUp.prototype.signUpUser({
         _id: userObjectId,
         email,
         name,
         phone,
         password:passwordHash,
         rol,
         job,
         codWorker
      });

      await userService.createUser(userData);

      const userJwt: string = SignUp.prototype.signToken(userData, userObjectId);
      req.jwt = userJwt!;
      res.status(HTTP_STATUS.CREATED).json({
         message: 'User  created succesfully',
         user: userData,
         token: userJwt,
      });
   }
}


