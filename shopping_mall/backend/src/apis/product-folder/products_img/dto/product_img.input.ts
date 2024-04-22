import { ApiProperty } from '@nestjs/swagger';

export class ProductImgInput {
  @ApiProperty({ example: '이미지주소' })
  image_url: string;

  @ApiProperty({ example: true })
  is_main: boolean;
}
