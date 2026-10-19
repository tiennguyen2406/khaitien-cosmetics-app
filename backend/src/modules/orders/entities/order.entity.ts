import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop({ required: false })
  image?: string;

  @Prop({ required: false, default: 'Tiêu chuẩn' })
  selectedType?: string;
}

export class ShippingAddress {
  @Prop({ required: true })
  recipientName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false, default: 'TP. Hồ Chí Minh' })
  city: string;

  @Prop({ required: false })
  district?: string;

  @Prop({ required: false })
  ward?: string;
}

@Schema({ timestamps: true, strict: false })
export class Order {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  @Prop({ required: false, default: null })
  userId?: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true, type: ShippingAddress })
  shippingAddress: ShippingAddress;

  @Prop({ required: true, type: [OrderItem] })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: false, default: 0 })
  shippingFee: number;

  @Prop({ required: true, default: 'COD' })
  paymentMethod: string;

  @Prop({ required: true, default: 'PENDING' })
  paymentStatus: string;

  @Prop({ required: true, default: 'PENDING' })
  orderStatus: string;

  @Prop({ required: false })
  notes?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
