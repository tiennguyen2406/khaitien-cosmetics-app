import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Product, ProductDocument } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private generateOrderNumber(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `COS-${dateStr}-${randomSuffix}`;
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    const orderNumber = this.generateOrderNumber();

    const orderData = {
      ...createOrderDto,
      orderNumber,
      customerEmail: createOrderDto.customerEmail || 'khachhang@cosmetica.vn',
      paymentMethod: createOrderDto.paymentMethod || 'COD',
      paymentStatus: createOrderDto.paymentMethod === 'ONLINE' ? 'PAID' : 'PENDING',
      orderStatus: 'PENDING',
      shippingFee: createOrderDto.shippingFee ?? 0,
    };

    const newOrder = new this.orderModel(orderData);
    const savedOrder = await newOrder.save();

    // Cập nhật soldCount cho các sản phẩm đã mua
    if (Array.isArray(createOrderDto.items)) {
      for (const item of createOrderDto.items) {
        try {
          const isObjId = Types.ObjectId.isValid(item.productId);
          const filter = isObjId
            ? { $or: [{ _id: item.productId }, { sku: item.productId }, { sku: item.sku }] }
            : { sku: item.sku || item.productId };

          await this.productModel.updateOne(filter, {
            $inc: { soldCount: item.quantity || 1, totalCount: -(item.quantity || 1) },
          });
        } catch (e) {
          // Bỏ qua lỗi cập nhật số lượng nếu sản phẩm không tồn tại
        }
      }
    }

    return savedOrder;
  }

  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByUser(userId: string): Promise<OrderDocument[]> {
    return this.orderModel
      .find({ $or: [{ userId }, { customerEmail: userId }] })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<OrderDocument> {
    const isObjectId = Types.ObjectId.isValid(id);
    const query = isObjectId
      ? { $or: [{ _id: id }, { orderNumber: id }] }
      : { orderNumber: id };

    const order = await this.orderModel.findOne(query).exec();
    if (!order) {
      throw new NotFoundException(`Đơn hàng với mã ${id} không tồn tại`);
    }
    return order;
  }

  async updateStatus(id: string, status: string): Promise<OrderDocument> {
    const isObjectId = Types.ObjectId.isValid(id);
    const query = isObjectId
      ? { $or: [{ _id: id }, { orderNumber: id }] }
      : { orderNumber: id };

    const updated = await this.orderModel
      .findOneAndUpdate(query, { orderStatus: status }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Đơn hàng với mã ${id} không tồn tại`);
    }
    return updated;
  }
}
