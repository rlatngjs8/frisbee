import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from 'src/apis/files/files.service';
import { Desc_img } from './entities/desc_img.entity';

@Injectable()
export class DescImgsService {
  constructor(
    @InjectRepository(Desc_img)
    private readonly descImgsRepository: Repository<Desc_img>,
    private readonly filesService: FilesService,
  ) {}

  async create({ desc_img }): Promise<Desc_img[]> {
    const imageUrls = await this.filesService.uploadFiles(desc_img);

    const savedProductImgs = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const img = new Desc_img();
      img.image_url = imageUrls[i]; // 업로드된 이미지 URL 할당

      const savedImg = await this.descImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }
    console.log('설명url', savedProductImgs);
    // 추가된 엔티티 리턴
    return savedProductImgs;
  }
  async update(product_no, desc_img): Promise<Desc_img[]> {
    await this.delete(product_no);

    const imageUrls = await this.filesService.uploadFiles(desc_img);

    const savedProductImgs = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const img = new Desc_img();
      img.image_url = imageUrls[i];
      img.product_no = product_no;

      const savedImg = await this.descImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }

    console.log('상품url', savedProductImgs);
    // 추가된 엔티티 리턴
    return savedProductImgs;
  }

  async delete(product_no): Promise<void> {
    // 주어진 product_no에 해당하는 제품 이미지를 찾습니다.
    const imagesToDelete = await this.descImgsRepository.find({ where: product_no });

    // 이미지를 순회하면서 삭제 작업을 수행합니다.
    for (const image of imagesToDelete) {
      // 이미지를 파일 서비스로 전달하여 삭제합니다.
      await this.filesService.deleteImages([image.image_url]);
      // 데이터베이스에서 이미지를 삭제합니다.
      await this.descImgsRepository.delete(image);
    }
  }
}
