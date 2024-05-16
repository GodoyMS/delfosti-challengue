import { Request, Response } from 'express';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { BadRequestError } from '@helpers/errors/badRequestError';
import HTTP_STATUS from 'http-status-codes';
import { userService } from '@services/db/user.service';
import { SignUpUserUtility } from './signup.utility';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { loginUserSchema } from '@user/schemes/signin';
import JWT from 'jsonwebtoken';
import { config } from '@configs/configEnvs';

export class SignIn extends SignUpUserUtility {

   @joiValidation(loginUserSchema)
   public async login(req: Request, res: Response): Promise<void> {

      const { email, password } = req.body;
      const existingUser: IUserDocument | undefined = await userService.getUserByEmail(email);

      if (!existingUser) {
         throw new BadRequestError('Invalid credentials user not found');
      }
      const passwordMatch: boolean = await existingUser.comparePassword(password);
      console.log('Password:Math', passwordMatch);
      if (!passwordMatch) {
         throw new BadRequestError('Invalid credentials password not match');
      }

      const userJwt: string = JWT.sign(
         {
            userId: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
         },
         config.JWT_TOKEN!,
         { expiresIn: '24h' },
      );
      req.jwt = userJwt;
      req.session!.user = { user: existingUser, token: userJwt };


      res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', user: existingUser, token: userJwt });
   }
}


