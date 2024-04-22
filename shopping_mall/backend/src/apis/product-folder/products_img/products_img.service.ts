import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product_img } from './entities/product_img.entity';
import { Repository } from 'typeorm';
import { FilesService } from 'src/apis/files/files.service';

@Injectable()
export class ProductImgsService {
  constructor(
    @InjectRepository(Product_img)
    private readonly productImgsRepository: Repository<Product_img>,
    private readonly filesService: FilesService,
  ) {}

  async create({ product_img }): Promise<Product_img[]> {
    const imageUrls = await this.filesService.uploadFiles(product_img);

    const savedProductImgs = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const img = new Product_img();
      img.image_url = imageUrls[i];
      img.is_main = i === 0; // 첫 번째 이미지일 때만 is_main을 true로 설정

      const savedImg = await this.productImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }

    console.log('상품url', savedProductImgs);
    // 추가된 엔티티 리턴
    return savedProductImgs;
  }
}
