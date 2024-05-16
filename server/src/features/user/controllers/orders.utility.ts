import { IOrderDocument, ORDERSTATUS } from '@orders/interfaces/orderDocument.interface';
import { ISignUpOrder } from '@orders/interfaces/signUpOrder.interface';

export abstract class SignUpOrderUtility {
   protected signUporder(data: ISignUpOrder): IOrderDocument {
      const { _id, numberOrder, productsList, sellerId, deliveryManId } =
         data;
      return {
         _id,
         numberOrder,
         productsList,
         orderDate: new Date(),
         sellerId,
         deliveryManId,
         state:ORDERSTATUS.STATE1,
         createdAt: new Date(),
      } as unknown as IOrderDocument;
   }
}
