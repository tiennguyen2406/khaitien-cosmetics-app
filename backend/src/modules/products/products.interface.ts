import { ProductDocument } from './entities/product.entity';

export interface IProductsService {
  create(createProductDto: any): Promise<ProductDocument>;
  findAll(): Promise<ProductDocument[]>;
  findOne(id: string): Promise<ProductDocument>;
  findFeatured(): Promise<ProductDocument[]>;
  findByCategory(category: string): Promise<ProductDocument[]>;
  update(id: string, updateProductDto: any): Promise<ProductDocument>;
  remove(id: string): Promise<void>;
}
