import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { AiService, ChatMessage } from './ai.service';
import { Public } from '../../common/decorators/public.decorator';

export class ChatRequestDto {
  @IsString()
  message: string;

  @IsArray()
  @IsOptional()
  history?: ChatMessage[];

  @IsString()
  @IsOptional()
  skinType?: string;
}

export class CompatibilityDto {
  @IsArray()
  @IsString({ each: true })
  ingredients: string[];
}

@ApiTags('AI Beauty Consultant')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tư vấn da liễu & RAG gợi ý sản phẩm phù hợp' })
  async chat(@Body() body: ChatRequestDto) {
    const { message, history, skinType } = body;
    return this.aiService.consult(message || '', history, skinType);
  }

  @Post('check-compatibility')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Kiểm tra tương kỵ và mức độ an toàn của hoạt chất' })
  checkCompatibility(@Body() body: CompatibilityDto) {
    return this.aiService.checkCompatibility(body.ingredients || []);
  }
}
