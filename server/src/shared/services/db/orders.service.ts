import {
   IOrderDocument,
   ORDERSTATUS,
} from '@orders/interfaces/orderDocument.interface';
import { OrderModel } from '@orders/models/order.schema';

class OrdersService {
   public async createOrder(data: IOrderDocument): Promise<IOrderDocument> {
      const createdOrder: IOrderDocument = await OrderModel.create(data);
      return createdOrder;
   }
   public async getOrderById(id:string):Promise<IOrderDocument | null >{
      const productExists: IOrderDocument | null = await OrderModel.findById(id).exec() as IOrderDocument | null;
      return productExists;
   }

   public async getOrderByNumberOrder(numberOrder:string):Promise<IOrderDocument | null >{
      const productExists: IOrderDocument | null = await OrderModel.findOne({numberOrder}).exec() as IOrderDocument | null;
      return productExists;
   }
   public async getAllOrders({
      skip,
      limit,
      numberOrder,
   }: {
      skip: number;
      limit: number;
      numberOrder?: number;
   }): Promise<{ orders: IOrderDocument[]; total: number }> {
      const query: { numberOrder?: number } = {};
      if (numberOrder) {
         query.numberOrder = numberOrder;
      }
      const [orders, total] = await Promise.all([
         OrderModel.find(query)
            .populate(['sellerId', 'deliveryManId', 'productsList'])
            .skip(skip)
            .limit(limit)
            .exec(),
         OrderModel.countDocuments(query),
      ]);
      return { orders, total };
   }

   public async updateOrderStateById(data: {
      id: string;
      state: string;
   }): Promise<IOrderDocument | null> {

      const updatedValue: {
         receiptDate?: Date;
         dispatchDate?: Date;
         deliveryDate?: Date;
         state:string
      }={
         state:data.state,
      };
      if(data.state===ORDERSTATUS.STATE2){
         updatedValue.receiptDate= new Date();
      }
      if(data.state===ORDERSTATUS.STATE3){
         updatedValue.dispatchDate= new Date();
      }
      if(data.state===ORDERSTATUS.STATE4){
         updatedValue.deliveryDate= new Date();
      }
      const orderToUpdate: IOrderDocument | null= await this.getOrderById(data.id);

      if(!orderToUpdate){ return null;}

      orderToUpdate.set(updatedValue);
      await orderToUpdate.save();

      return await this.getOrderById(data.id);

   }
}

export const ordersService: OrdersService = new OrdersService();
