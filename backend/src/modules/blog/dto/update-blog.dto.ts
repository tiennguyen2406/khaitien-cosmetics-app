import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsArray,
  IsString,
} from 'class-validator';
import { BlogStatus } from '../entities/blog.entity';
import { Transform } from 'class-transformer';

const normalizeStringArray = ({ value }: { value: unknown }): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
};

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsOptional()
  @IsBoolean()
  isHidden?: boolean;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

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
}

// Re-export BlogSeoDto for convenience
export { BlogSeoDto } from './create-blog.dto';
