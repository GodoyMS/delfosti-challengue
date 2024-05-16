import { BadRequestError } from '@helpers/errors/badRequestError';
import { userService } from '@services/db/user.service';
import { UserPayload } from '@user/interfaces/authPayload.interface';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { SignUpOrderUtility } from './orders.utility';
import {
   IOrderDocument,
   ORDERSTATUS,
} from '@orders/interfaces/orderDocument.interface';
import { ObjectId } from 'mongodb';
import { ordersService } from '@services/db/orders.service';
import { joiValidation } from '../../../shared/decorators/joi-validation.decorators';
import { singUpOrderScheme } from '@orders/schemes/signup';
import { updateOrderStatusScheme } from '@orders/schemes/updateStatus';

export class OrdersUserController extends SignUpOrderUtility {
   @joiValidation(singUpOrderScheme)
   public async create(req: Request, res: Response): Promise<void> {
      const { userId } = req.currentUser as UserPayload; //AutClinic.id
      const { numberOrder, productsList, sellerId, deliveryManId } = req.body;
      const existingUser = await userService.getUserById(userId);
      if (!existingUser) {
         throw new BadRequestError('Invalid User');
      }

      const sellerUser = await userService.getUserById(sellerId);
      const deliveryManUser = await userService.getUserById(deliveryManId);
      const existingDuplicateOrder= await ordersService.getOrderByNumberOrder(numberOrder);
      if(existingDuplicateOrder){
         throw new BadRequestError(
            'This numberOrder already belongs to an existing Order'
         );
      }
      
      if (sellerUser.rol !== 'Vendedor') {
         throw new BadRequestError(
            'This sellerId value does not belong to a User wich rol is Vendedor'
         );
      }
      if (deliveryManUser.rol !== 'Repartidor') {
         throw new BadRequestError(
            'This deliveryManId value does not belong to a User wich rol is Repartidor'
         );
      }
      const orderObjectId: ObjectId = new ObjectId();
      const orderDoc: IOrderDocument =
         OrdersUserController.prototype.signUporder({
            _id: orderObjectId,
            numberOrder,
            productsList,
            sellerId,
            deliveryManId,
         });
      const createdOrder: IOrderDocument = await ordersService.createOrder(
         orderDoc
      );
      res.status(HTTP_STATUS.OK).json({ order: createdOrder });
   }

   public async readOrders(req: Request, res: Response): Promise<void> {
      const { userId } = req.currentUser as UserPayload; //AutClinic.id
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 15;
      const skip = (page - 1) * limit;
      const numberOrder: number = parseInt(req.query.numberOrder as string, 10) ;

      const existingUser = await userService.getUserById(userId);
      if (!existingUser) {
         throw new BadRequestError('Invalid User');
      }

      const { orders, total } = await ordersService.getAllOrders({
         skip,
         limit,
         numberOrder: numberOrder as unknown as number,
      });
      const totalPages = Math.ceil(total / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      res.status(HTTP_STATUS.OK).json({
         orders,
         total,
         hasPrevPage,
         hasNextPage,
         totalPages,
      });
   }

   @joiValidation(updateOrderStatusScheme)
   public async updateOrderStatus(req: Request, res: Response): Promise<void> {
      const orderId = req.params.id; //doctorUser.id
      const { userId } = req.currentUser as UserPayload; //AutClinic.id
      const { state } = req.body;
      const existingUser = await userService.getUserById(userId);
      if (!existingUser) {
         throw new BadRequestError('Invalid User');
      }
      const currentOrder: IOrderDocument | null =
         await ordersService.getOrderById(orderId);
      if (currentOrder) {
         if (currentOrder.state === ORDERSTATUS.STATE1) {
            if (state === ORDERSTATUS.STATE1) {
               throw new BadRequestError('Invalid State');
            }
         }
         if (currentOrder.state === ORDERSTATUS.STATE2) {
            if (state === ORDERSTATUS.STATE1 || state === ORDERSTATUS.STATE2) {
               throw new BadRequestError('Invalid State');
            }
         }

         if (currentOrder.state === ORDERSTATUS.STATE3) {
            if (
               state === ORDERSTATUS.STATE1 ||
               state === ORDERSTATUS.STATE2 ||
               state === ORDERSTATUS.STATE3
            ) {
               throw new BadRequestError('Invalid State');
            }
         }
         if (currentOrder.state === ORDERSTATUS.STATE4) {
            throw new BadRequestError(
               'State can be changed as it is final state'
            );
         }

         const updatedOrder: IOrderDocument | null =
            await ordersService.updateOrderStateById({ id: orderId, state });

         res.status(HTTP_STATUS.OK).json({ order: updatedOrder });
      } else {
         throw new BadRequestError('Invalid order id');
      }
   }
}
