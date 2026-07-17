import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Son môi dưỡng môi cao cấp' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Son môi dưỡng môi với thành phần tự nhiên...' })
  @IsString()
  description: string;

  @ApiProperty({ example: 29.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: ['image1.jpg', 'image2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ example: 'Lipstick' })
  @IsString()
  category: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ example: 128, required: false })
  @IsOptional()
  @IsNumber()
  reviews?: number;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsNumber()
  stock?: number;
}
