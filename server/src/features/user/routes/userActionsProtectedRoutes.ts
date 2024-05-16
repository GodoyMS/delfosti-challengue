import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { OrdersUserController } from '@user/controllers/orders';
import { ProductsUserController } from '@user/controllers/products';
import { UsersUserController } from '@user/controllers/users';
import express, { Router } from 'express';

class UserActionsProtectedRoutes {
   private router: Router;
   constructor() {
      this.router = express.Router();
   }
   public ordersRoutes(): Router {
      this.router.post('/user/orders/create', authMiddleware.checkAuthentication,OrdersUserController.prototype.create);
      this.router.get('/user/orders/read', authMiddleware.checkAuthentication,OrdersUserController.prototype.readOrders);
      this.router.put('/user/orders/update/:id', authMiddleware.checkAuthentication,OrdersUserController.prototype.updateOrderStatus);

      return this.router;
   }

   public productsRoutes(): Router { //UsersUserController ProductsUserController
      this.router.get('/user/products/read', authMiddleware.checkAuthentication,ProductsUserController.prototype.readProducts);

      return this.router;
   }

   public userRoutes(): Router {
      this.router.get('/user/users/read', authMiddleware.checkAuthentication,UsersUserController.prototype.readUsers);

      return this.router;
   }
}

export const userActionsProtectedRoutes: UserActionsProtectedRoutes = new UserActionsProtectedRoutes();
