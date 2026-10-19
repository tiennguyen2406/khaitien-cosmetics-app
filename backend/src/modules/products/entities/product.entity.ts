import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ strict: false, timestamps: true })
export class Product {
  @Prop({ required: false })
  sku?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false, default: 0 })
  originalPrice?: number;

  @Prop({ required: false, default: 0 })
  discount?: number;

  @Prop({ required: false })
  brand?: string;

  @Prop({ required: false })
  image?: string;

  @Prop({ required: true, type: [String] })
  images: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ default: true })
  inStock: boolean;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: false })
  isHotDeal?: boolean;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviews: number;

  @Prop({ default: 0 })
  soldCount?: number;

  @Prop({ default: 100 })
  totalCount?: number;

  @Prop({ default: 0 })
  likeCount?: number;

  @Prop({ type: [String], default: [] })
  types?: string[];

  @Prop({ type: [String], default: [] })
  ingredients?: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
