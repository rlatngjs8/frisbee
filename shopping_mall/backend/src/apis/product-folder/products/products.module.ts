import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Product_information } from '../products_information/entities/product_information.entity';
import { SubCategory } from '../products_categories/subCategories/entities/subCategory.entity';
import { Product_img } from '../products_img/entities/product_img.entity';
import { Desc_img } from '../desc_img/entities/desc_img.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FilesService } from 'src/apis/files/files.service';
import { ProductsInformationService } from '../products_information/products_information.service';
import { ProductImgsService } from '../products_img/products_img.service';
import { DescImgsService } from '../desc_img/desc_img.service';
import { SubCategoriesService } from '../products_categories/subCategories/subCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      Product_information,
      SubCategory,
      Product_img,
      Desc_img,
    ]),
  ],
  providers: [ProductsService, FilesService, ProductsInformationService, ProductImgsService, DescImgsService, SubCategoriesService],
  controllers: [ProductsController],
})
export class ProductsModule {}
