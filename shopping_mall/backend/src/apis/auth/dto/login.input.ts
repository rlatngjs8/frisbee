import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  password: string;
}
