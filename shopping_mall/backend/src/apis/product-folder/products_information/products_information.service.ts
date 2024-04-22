import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product_information } from './entities/product_information.entity';
import { Repository } from 'typeorm';
import { ProductInformationInput } from './dto/product-information.input';

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
}
