import { BadRequestError } from '@helpers/errors/badRequestError';
import { productsService } from '@services/db/products.service';
import { userService } from '@services/db/user.service';
import { UserPayload } from '@user/interfaces/authPayload.interface';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class ProductsUserController {

   public async readProducts(req: Request, res: Response): Promise<void> {
      const { userId } = req.currentUser as UserPayload; //AutClinic.id
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 15;
      const skip = (page - 1) * limit;
      const search = req.query?.search as string;

      const existingUser = await userService.getUserById(userId);
      if (!existingUser) {
         throw new BadRequestError('Invalid User');
      }

      const { products, total } = await productsService.getAllProducts({
         skip,
         limit,
         search,
      });
      const totalPages = Math.ceil(total / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      res.status(HTTP_STATUS.OK).json({
         products,
         total,
         hasPrevPage,
         hasNextPage,
         totalPages
      });
   }
}
