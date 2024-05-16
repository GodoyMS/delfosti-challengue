import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';


export class SignOut {
   public async signout(req: Request, res: Response): Promise<void> {
      req.jwt = '';
      req.session = null;

      res.status(HTTP_STATUS.OK).json({ message: 'Logout successful', user: {}, token: '' });
   }
}
