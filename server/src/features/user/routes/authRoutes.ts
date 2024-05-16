import express, { Router } from 'express';
import { SignUp } from '@user/controllers/signup';
import { SignIn } from '@user/controllers/signIn';
import { SignOut } from '@user/controllers/signout';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { CurrentUser } from '@user/controllers/currentUser';

class UserAuthRoutes {
   private router: Router;

   constructor() {
      this.router = express.Router();
   }

   public routes(): Router {

      // this.router.post('/check-email-availability', SignUp.prototype.checkEmailAvailability);

      this.router.post('/signup', SignUp.prototype.create);
      this.router.post('/signin', SignIn.prototype.login);

      return this.router;
   }
   public currentUserRoutes(){
      this.router.get('/getAuthData',authMiddleware.checkAuthentication, CurrentUser.prototype.getAuthData);
      return this.router;

   }
   public signoutRoute(): Router {
      this.router.get('/signout', SignOut.prototype.signout);
      return this.router;
    }

   // public signoutRoute(): Router {
   //    this.router.get('/signout', SignOut.prototype.signout);

   //    return this.router;
   // }


   // public currentUserAuthRoutes(): Router {
   //    this.router.get('/currentAuth', authMiddleware.checkAuthentication, CurrentAuthClinic.prototype.read);

   //    return this.router;
   // }
}

export const authUserRoutes: UserAuthRoutes = new UserAuthRoutes();
