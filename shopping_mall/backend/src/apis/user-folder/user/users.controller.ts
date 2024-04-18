import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/apis/files/files.service';
import { FileUploadDto } from 'src/apis/files/dto/fileupload.input';

@Controller('user')
@ApiTags('User API')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '회원가입api', description: '회원가입을 수행하고, 프로필 이미지를 업로드할 수 있습니다.' })
  @ApiCreatedResponse({ description: '회원가입완료' })
  async createUser(
    @Body() createUserInput: CreateUserInput, //
    @UploadedFile() file?: Express.Multer.File,
    // @Req() req: Request,
  ): Promise<User> {
    // 프론트에서 기본이미지 디폴트로 설정되도록
    let profile_img: string;

    if (file) {
      // 업로드된 파일이 있는 경우
      profile_img = await this.filesService.uploadFile(file);
    } else {
      // 업로드된 파일이 없는 경우, 기본 이미지 경로 설정
      profile_img = 'shopping-mall-storage/john_doe.jpeg';
    }
    // const profile_img = await this.filesService.uploadFile(file);
    const user: User = await this.usersService.create({ createUserInput, profile_img });
    return user;
  }
}
