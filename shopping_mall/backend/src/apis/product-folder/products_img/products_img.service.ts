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
  async update(product_no, product_img): Promise<Product_img[]> {
    await this.delete(product_no);

    const imageUrls = await this.filesService.uploadFiles(product_img);

    const savedProductImgs = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const img = new Product_img();
      img.image_url = imageUrls[i];
      img.is_main = i === 0; // 첫 번째 이미지일 때만 is_main을 true로 설정
      img.product_no = product_no;

      const savedImg = await this.productImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }

    console.log('상품url', savedProductImgs);
    // 추가된 엔티티 리턴
    return savedProductImgs;
  }

  async delete(product_no): Promise<void> {
    // 주어진 product_no에 해당하는 제품 이미지를 찾습니다.
    const imagesToDelete = await this.productImgsRepository.find({ where: product_no });

    console.log('상품번호', product_no);
    console.log('상품이미지', imagesToDelete);
    // 이미지를 순회하면서 삭제 작업을 수행합니다.
    for (const image of imagesToDelete) {
      // 이미지를 파일 서비스로 전달하여 삭제합니다.
      await this.filesService.deleteImages([image.image_url]);
      // 데이터베이스에서 이미지를 삭제합니다.
      const result = await this.productImgsRepository.delete(image);
      console.log(result);
    }
  }
}
