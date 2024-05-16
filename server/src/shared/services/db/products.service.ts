
import { IProductDocument } from '@products/interfaces/productDocument.interface';
import { ProductModel } from '@products/models/product.schema';

interface ProductQuery {
   $or?: Array<{ sku?: string; name?: string }>;
 }

class ProductsService {
   public async createProduct(data: IProductDocument): Promise<IProductDocument> {
      const createdProduct: IProductDocument = await ProductModel.create(data);
      return createdProduct;
   }

   public async getProductBySku(sku:string):Promise<IProductDocument | null >{
      const productExists: IProductDocument | null = await ProductModel.findOne({sku}).exec() as IProductDocument | null;
      return productExists;
   }

   public async getAllProducts({
      skip,
      limit,
      search,
   }: {
      skip: number;
      limit: number;
      search?: string;
   }): Promise<{ products: IProductDocument[]; total: number }> {

      const query: ProductQuery = {};

      if (search) {
         query.$or = [
           { sku: search },
           { name: search }
         ];
       }

       const [products, total] = await Promise.all([
         ProductModel.find(query)
           .skip(skip)
           .limit(limit)
           .exec(),
         ProductModel.countDocuments(query)
       ]);
      return { products, total };
   }


}

export const productsService: ProductsService = new ProductsService();
