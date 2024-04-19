import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/apis/files/files.service';
import { UpdateUserInput } from './dto/update-user.input';

@Controller('user')
@ApiTags('User API')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly filesService: FilesService,
  ) {}
  @Get()
  @ApiOperation({ summary: '모든 사용자 조회', description: '모든 사용자 정보를 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 모든 사용자 정보를 가져옴', type: User, isArray: true })
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':user_no')
  @ApiOperation({ summary: '특정 사용자 조회', description: '특정 사용자 정보를 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 특정 사용자 정보를 가져옴', type: User })
  async fetchUser(@Param('user_no') user_no: number): Promise<User> {
    const user = await this.usersService.findOne({ user_no });
    return user;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '회원가입api', description: '회원가입을 수행하고, 프로필 이미지를 업로드할 수 있습니다.' })
  @ApiCreatedResponse({ description: '회원가입완료', type: User })
  async createUser(@Body() createUserInput: CreateUserInput, @UploadedFile() file?: Express.Multer.File): Promise<User> {
    let profile_img: string;
    if (file) {
      profile_img = await this.filesService.uploadFile(file);
    } else {
      profile_img = 'shopping-mall-storage/john_doe.jpeg';
    }
    return await this.usersService.create({ createUserInput, profile_img });
  }

  @Patch(':user_no')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '회원수정api', description: '회원정보를 수정하고, 프로필 이미지를 업로드할 수 있습니다.' })
  @ApiCreatedResponse({ description: '회원정보 수정완료', type: User })
  async updateUser(@Param('user_no') user_no: number, @Body() updateUserInput: UpdateUserInput, @UploadedFile() file?: Express.Multer.File): Promise<User> {
    let profile_img: string;
    if (file) {
      profile_img = await this.filesService.uploadFile(file);
    } else {
      const user = await this.usersService.findOne({ user_no });
      profile_img = user.profile_img;
    }

    return this.usersService.update({ user_no, updateUserInput, profile_img });
  }

  @Delete(':user_no')
  @ApiOperation({ summary: '사용자 삭제', description: '특정 사용자를 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 사용자 삭제됨' })
  async deleteUser(@Param('user_no') user_no: number): Promise<string> {
    const user = await this.usersService.findOne({ user_no });
    if (user.profile_img !== 'shopping-mall-storage/john_doe.jpeg') {
      const profile_img = user.profile_img;
      console.log('파일명: ', profile_img);
      await this.filesService.deleteProfileImg({ profile_img });
    }
    return await this.usersService.delete({ user_no });
  }
}
