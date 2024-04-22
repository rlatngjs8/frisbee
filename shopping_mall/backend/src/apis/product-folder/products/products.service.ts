import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { IProductsServiceFindOne } from './interfaces/products-serivce.interface';
import { FilesService } from 'src/apis/files/files.service';
import { ProductsInformationService } from '../products_information/products_information.service';
import { ProductImgsService } from '../products_img/products_img.service';
import { DescImgsService } from '../desc_img/desc_img.service';
import { SubCategoriesService } from '../products_categories/subCategories/subCategories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, //
    private readonly filesService: FilesService,
    private readonly productsInformationService: ProductsInformationService,
    private readonly productImgsService: ProductImgsService,
    private readonly descImgsService: DescImgsService,
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne({ product_no }: IProductsServiceFindOne): Promise<Product> {
    const result = await this.productRepository.findOne({
      where: { product_no },
      relations: [
        'product_img',
        'product_information',
        'product_review',
        'product_review.product_review_comment',
        'seller',
        'subCategory',
        'subCategory.middleCategory',
        'subCategory.middleCategory.mainCategory',
      ],
    });
    if (!result) new HttpException('상품을 찾을 수 없습니다.', 409);
    return result;
  }

  async create({ createProductInput, product_img, desc_img }) {
    const { model_name, voltage, release_date, made_country, spec, inquiry, authentication, energy, manufacturer, size, assurance, ...product } = createProductInput;
    const product_information = {
      model_name,
      voltage,
      release_date,
      made_country,
      spec,
      inquiry,
      authentication,
      energy,
      manufacturer,
      size,
      assurance,
    };
    const sub_category_no = createProductInput.sub_category_no;

    const product_info = await this.productsInformationService.create(product_information);
    const product_imgs = await this.productImgsService.create({ product_img });
    const desc_imgs = await this.descImgsService.create({ desc_img });
    const subCategory = await this.subCategoriesService.findOne({ sub_category_no });

    const result = this.productRepository.save({
      ...product,
      product_information: product_info,
      product_img: product_imgs,
      desc_img: desc_imgs,
      subCategory: subCategory,
    });

    return result;
  }
}
