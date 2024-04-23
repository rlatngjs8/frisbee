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

  async update({ product_no, updateProductInput, product_img, desc_img }) {
    const { model_name, voltage, release_date, made_country, spec, inquiry, authentication, energy, manufacturer, size, assurance, ...product } = updateProductInput;
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

    await this.productsInformationService.update(product_no, product_information);
    await this.productImgsService.update(product_no, product_img);
    await this.descImgsService.update(product_no, desc_img);
    let updatedSubCategory;
    if (updateProductInput.sub_category_no) {
      updatedSubCategory = await this.subCategoriesService.findOne({ sub_category_no: updateProductInput.sub_category_no });
    }
    let productToUpdate = await this.productRepository.findOne({ where: { product_no } });

    if (updatedSubCategory) {
      productToUpdate.subCategory = updatedSubCategory;
    }
    productToUpdate = { ...productToUpdate, ...product };

    return await this.productRepository.save(productToUpdate);
  }

  async delete({ product_no }): Promise<string> {
    try {
      // 해당 제품 번호에 대한 이미지를 삭제합니다.
      await Promise.all([
        this.productImgsService.delete({ product_no }), //
        this.descImgsService.delete({ product_no }),
        this.productsInformationService.delete({ product_no }),
      ]);

      // 외래 키 제약 조건에 따라 제품을 삭제합니다.
      await this.productRepository.delete({ product_no });

      return 'deleted';
    } catch (error) {
      // 오류 처리
      console.error('제품 삭제 중 오류 발생:', error);
      throw error;
    }
  }
}
