import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductInformationInput } from '../../products_information/dto/product-information.input';

export class CreateProductInput {
  @ApiProperty({ example: '아이폰15' })
  product_name: string;

  @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
  product_img?: any[]; // 파일 업로드 필드

  @ApiProperty({ example: '상품설명' })
  desc: string;

  @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
  desc_img?: any[]; // 파일 업로드 필드

  @ApiProperty({ example: 1000000 })
  price: number;

  @ApiProperty({ example: '모델명' })
  model_name: string;

  @ApiProperty({ example: '15v' })
  voltage: string;

  @ApiProperty({ example: '2023-10-10' })
  release_date: string;

  @ApiProperty({ example: '대한민국' })
  made_country: string;

  @ApiProperty({ example: '스펙' })
  spec: string;

  @ApiProperty({ example: 'inquiry' })
  inquiry: string;

  @ApiProperty({ example: 'authentication' })
  authentication: string;

  @ApiProperty({ example: '에너지' })
  energy: string;

  @ApiProperty({ example: '제조사' })
  manufacturer: string;

  @ApiProperty({ example: '사이즈' })
  size: string;

  @ApiProperty({ example: 'assurance' })
  assurance: string;

  @ApiProperty({ example: 1 })
  sub_category_no: number;
}
