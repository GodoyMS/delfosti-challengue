import express, { Router } from 'express';
import { SignUpProduct } from '@products/controllers/signUp';

class ProductRoutes {
   private router: Router;

   constructor() {
      this.router = express.Router();
   }

   public routes(): Router {
      this.router.post('/products/create', SignUpProduct.prototype.create);
      return this.router;
   }


}

export const productRoutes: ProductRoutes = new ProductRoutes();
