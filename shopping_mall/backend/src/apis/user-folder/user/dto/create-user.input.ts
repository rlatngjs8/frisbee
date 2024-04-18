import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserInput {
  @ApiProperty({ example: 'john_doe123' }) // 예시 값 추가
  user_id: string;

  @ApiProperty({ example: 'John Doe' }) // 예시 값 추가
  name: string;

  // profile_img: string;

  @ApiProperty({ example: 'johndoe' }) // 예시 값 추가
  nickname: string;

  @ApiProperty({ example: 'password123' }) // 예시 값 추가
  password: string;

  @ApiProperty({ example: '1990-01-01' }) // 예시 값 추가
  birthday: string;

  @ApiProperty({ example: '123-456-7890' }) // 예시 값 추가
  phone: string;

  @ApiProperty({ example: '123 Main St, City, Country' }) // 예시 값 추가
  address: string;

  @ApiProperty({ example: 'john.doe@example.com' }) // 예시 값 추가
  email: string;

  // 파일 필드 추가
  @ApiPropertyOptional({ type: 'file' })
  file?: any;
}
