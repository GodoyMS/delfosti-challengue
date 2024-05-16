import { Request, Response } from 'express';
import { BadRequestError } from '@helpers/errors/badRequestError';
import HTTP_STATUS from 'http-status-codes';
import { userService } from '@services/db/user.service';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { UserPayload } from '@user/interfaces/authPayload.interface';
export class CurrentUser {
   public async getAuthData(req: Request, res: Response): Promise<void> {
      const { userId } = req.currentUser as UserPayload;
      const existingAuthUser: IUserDocument | undefined = await userService.getUserById(userId);
      if (!existingAuthUser) {
         throw new BadRequestError('Invalid credentials');
      }
      res.status(HTTP_STATUS.OK).json({ message: 'Success getting authData', authData: existingAuthUser });
   }
}


