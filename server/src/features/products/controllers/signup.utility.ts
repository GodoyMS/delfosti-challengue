import { ISignUpProduct } from '@products/interfaces/signUpData.interface';
import { IProductDocument } from '@products/interfaces/productDocument.interface';

export abstract class SignUpProductUtility {

   protected signUpProduct(data:ISignUpProduct):IProductDocument{
   const {_id,name,sku,type,tag,price,unit}=data;
   return{
      _id,
      sku,
      name,
      type,
      tag,
      price,
      unit,
      createdAt:new Date()
   } as unknown as IProductDocument;

   }

}
