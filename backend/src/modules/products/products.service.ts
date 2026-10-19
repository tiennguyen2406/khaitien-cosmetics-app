import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { IProductsService } from './products.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(query?: any): Promise<ProductDocument[]> {
    const filter: any = {};
    if (query?.category) {
      filter.category = new RegExp(`^${query.category}$`, 'i');
    }
    if (query?.brand) {
      filter.brand = new RegExp(`^${query.brand}$`, 'i');
    }
    if (query?.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { brand: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }
    return this.productModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<ProductDocument> {
    const isObjectId = Types.ObjectId.isValid(id);
    const query = isObjectId ? { $or: [{ _id: id }, { sku: id }] } : { sku: id };
    const product = await this.productModel.findOne(query).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID or SKU ${id} not found`);
    }
    return product;
  }

  async findFeatured(): Promise<ProductDocument[]> {
    return this.productModel
      .find({ $or: [{ featured: true }, { isHotDeal: true }, { discount: { $gte: 15 } }] })
      .limit(12)
      .exec();
  }

  async findByCategory(category: string): Promise<ProductDocument[]> {
    return this.productModel
      .find({ category: new RegExp(`^${category}$`, 'i') })
      .exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    const isObjectId = Types.ObjectId.isValid(id);
    const filter = isObjectId ? { $or: [{ _id: id }, { sku: id }] } : { sku: id };
    const product = await this.productModel
      .findOneAndUpdate(filter, updateProductDto, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID or SKU ${id} not found`);
    }
    return product;
  }

  async remove(id: string): Promise<void> {
    const isObjectId = Types.ObjectId.isValid(id);
    const filter = isObjectId ? { $or: [{ _id: id }, { sku: id }] } : { sku: id };
    const result = await this.productModel.findOneAndDelete(filter).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID or SKU ${id} not found`);
    }
  }
}
