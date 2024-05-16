import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '@configs/configEnvs';
import { NotAuthorizedError } from '@helpers/errors/notAuthorizedError';
import {  UserPayload} from '@user/interfaces/authPayload.interface';

// Custom interface extending SessionData

export class AuthMiddleware {
   public verifyUser(req: Request, _res: Response, next: NextFunction): void {
      if (req.session?.user) {
         try {
            const payload: UserPayload = JWT.verify(req.session?.user?.token, config.JWT_TOKEN!) as UserPayload;
            req.currentUser = payload;
         } catch (error) {
            throw new NotAuthorizedError('Token is invalid. Please login again in verify user.');
         }
      } else if (typeof req.headers['authorization'] === 'string') {
         const token = req.headers['authorization']!.split(' ')[1];
         if (!token) {
            throw new NotAuthorizedError('Token is not available. Please login again.2');
         }

         try {
            const payload: UserPayload = JWT.verify(token, config.JWT_TOKEN!) as UserPayload;

            if (!payload) {
               throw new NotAuthorizedError('You need to log in');
            }
            req.currentUser = payload;
         } catch (error) {
            throw new NotAuthorizedError('Token is invalid. Please login again in verify user.');
         }
      } else {
         throw new NotAuthorizedError('Token is not available. Please login again.');
      }
      next();

      // if (!req.session?.jwt ) {
      //    throw new NotAuthorizedError('Token is not available. Please login again.');
      // }

      // try {
      //    const payload: AuthPayload = JWT.verify(req.session?.jwt, config.JWT_TOKEN!) as AuthPayload;
      //    req.currentUser = payload;
      // } catch (error) {
      //    throw new NotAuthorizedError('Token is invalid. Please login again in verify user.');
      // }
      // next();

      // if(!req.jwt){
      //    throw new NotAuthorizedError('You need to log in');
      // }
      // const authHeader = req.headers['authorization'];

      // if (typeof authHeader !== 'string') {
      //    throw new NotAuthorizedError('Token is not available. Please login again.1');
      // }

      // const token = authHeader.split(' ')[1];

      // if (!token) {
      //    throw new NotAuthorizedError('Token is not available. Please login again.2');
      // }

      // try {
      //    const payload: AuthPayload = JWT.verify(token, config.JWT_TOKEN!) as AuthPayload;

      //    if (!payload) {
      //       throw new NotAuthorizedError('You need to log in');
      //    }
      //    req.currentUser = payload;
      // } catch (error) {
      //    throw new NotAuthorizedError('Token is invalid. Please login again in verify user.');
      // }
      // next();
   }

   public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
      if (!req.currentUser) {
         throw new NotAuthorizedError('Authentication is required to access this route in checkAuth.');
      }
      next();
   }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
