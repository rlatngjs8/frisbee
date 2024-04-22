import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_img } from './entities/product_img.entity';
import { FilesService } from 'src/apis/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product_img])],
  providers: [FilesService],
})
export class ProductIMGModule {}
