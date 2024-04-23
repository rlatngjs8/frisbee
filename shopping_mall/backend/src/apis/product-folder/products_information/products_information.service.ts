import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product_information } from './entities/product_information.entity';
import { Repository } from 'typeorm';
import { ProductInformationInput } from './dto/product-information.input';
import { UpdateProductInfo } from './dto/update-product-info.input';

@Injectable()
export class ProductsInformationService {
  constructor(
    @InjectRepository(Product_information)
    private readonly productsInformationRepository: Repository<Product_information>,
  ) {}
  async create(product_information: ProductInformationInput) {
    console.log('인포서비스에 받아온데이터: ', product_information);

    return this.productsInformationRepository.save({
      ...product_information,
    });
  }

  async update(product_no, product_information: UpdateProductInfo) {
    let updateProductInfo = await this.productsInformationRepository.findOne({ where: { product_no } });
    if (!updateProductInfo) throw new HttpException('해당 상품을 찾을 수 없습니다', 409);

    updateProductInfo = { ...updateProductInfo, ...product_information };

    return await this.productsInformationRepository.save(updateProductInfo);
  }
  async delete(product_no) {
    await this.productsInformationRepository.delete({ product_no });
  }
}
