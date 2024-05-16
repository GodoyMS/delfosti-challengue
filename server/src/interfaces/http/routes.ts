import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { productRoutes } from '@products/routes/productRoutes';
import { authUserRoutes } from '@user/routes/authRoutes';
import { userActionsProtectedRoutes } from '@user/routes/userActionsProtectedRoutes';
import { Application } from 'express';

export default (app: Application) => {
   const routes = () => {
      //  app.use('/queues', serverAdapter.getRouter());

       app.use('/api/auth', authUserRoutes.signoutRoute());
      app.use('/api/auth', authUserRoutes.routes());
      app.use('/api/check-auth',authMiddleware.verifyUser, authUserRoutes.currentUserRoutes());

      //userActionsProtectedRoutes
      app.use('/api',authMiddleware.verifyUser, userActionsProtectedRoutes.productsRoutes());

      app.use('/api',authMiddleware.verifyUser, userActionsProtectedRoutes.userRoutes());
      app.use('/api',authMiddleware.verifyUser, userActionsProtectedRoutes.ordersRoutes());

      app.use('/api', productRoutes.routes());



      app.get('/hello', (req, res) => {
         res.send('Hello, world!');
      });
   };
   routes();
};
