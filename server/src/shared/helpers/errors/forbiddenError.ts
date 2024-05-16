import HTTP_STATUS from 'http-status-codes';
import { CustomError } from './customError';

export class ForbiddenEror extends CustomError {
   statusCode = HTTP_STATUS.FORBIDDEN;
   status = 'error';

   constructor(message: string) {
      super(message);
   }
}
