import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FilesService } from 'src/apis/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, FilesService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
