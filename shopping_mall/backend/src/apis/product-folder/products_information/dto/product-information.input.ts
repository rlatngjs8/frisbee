import { ApiProperty } from '@nestjs/swagger';

export class ProductInformationInput {
  @ApiProperty({
    type: 'string',
    example: '모델명',
  })
  model_name: string;

  @ApiProperty({
    type: 'string',
    example: '15v',
  })
  voltage: string;

  @ApiProperty({
    type: 'string',
    example: '2023-10-10',
  })
  release_date: string;

  @ApiProperty({
    type: 'string',
    example: '대한민국',
  })
  made_country: string;

  @ApiProperty({
    type: 'string',
    example: '스펙',
  })
  spec: string;

  @ApiProperty({
    type: 'string',
    example: 'inquiry',
  })
  inquiry: string;

  @ApiProperty({
    type: 'string',
    example: 'authentication',
  })
  authentication: string;

  @ApiProperty({
    type: 'string',
    example: '에너지',
  })
  energy: string;

  @ApiProperty({
    type: 'string',
    example: '제조사',
  })
  manufacturer: string;

  @ApiProperty({
    type: 'string',
    example: '사이즈',
  })
  size: string;

  @ApiProperty({
    type: 'string',
    example: 'assurance',
  })
  assurance: string;
}
