import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from 'src/apis/files/files.service';
import { Desc_img } from './entities/desc_img.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Desc_img])],
  providers: [FilesService],
})
export class DescIMGModule {}
