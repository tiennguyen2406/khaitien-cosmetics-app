import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

const normalizeStringArray = ({ value }: { value: unknown }): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
};

export class BlogSeoDto {
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @IsOptional()
  @IsString()
  ogImage?: string;
}

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @IsString()
  @IsNotEmpty()
  excerpt!: string;

  @IsString()
  @IsNotEmpty()
  blogData!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @Transform(normalizeStringArray)
  @IsArray()
  @IsString({ each: true })
  categoryMain?: string[];

  @IsOptional()
  @Transform(normalizeStringArray)
  @IsArray()
  @IsString({ each: true })
  categorySub?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BlogSeoDto)
  seo?: BlogSeoDto;
}
