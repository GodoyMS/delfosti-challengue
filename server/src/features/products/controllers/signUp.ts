import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { signUpProductSchemeValidation } from '@products/schemes/signup';
import { SignUpProductUtility } from './signup.utility';
import { IProductDocument } from '@products/interfaces/productDocument.interface';
import { productsService } from '@services/db/products.service';
import { BadRequestError } from '@helpers/errors/badRequestError';

export class SignUpProduct extends SignUpProductUtility {

   @joiValidation(signUpProductSchemeValidation)
   public async create(req: Request, res: Response): Promise<void> {
      const {sku,name,tag,price,unit,type } =
         req.body;

         const productExists= await productsService.getProductBySku(sku);

         if(productExists){
            throw new BadRequestError('This SKU is already in use');
         }

      const productObjectId: ObjectId = new ObjectId();
      const productDoc: IProductDocument = SignUpProduct.prototype.signUpProduct({
         _id: productObjectId,
         sku,
         name,
         tag,price,unit,type
      });
      const createdProduct= await productsService.createProduct(productDoc);
      res.status(HTTP_STATUS.CREATED).json({
         message: 'Product  created succesfully',
         product:createdProduct
      });
   }
}


