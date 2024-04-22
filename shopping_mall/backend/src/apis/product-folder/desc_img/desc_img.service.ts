import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from 'src/apis/files/files.service';
import { Desc_img } from './entities/desc_img.entity';

@Injectable()
export class DescImgsService {
  constructor(
    @InjectRepository(Desc_img)
    private readonly DescImgsRepository: Repository<Desc_img>,
    private readonly filesService: FilesService,
  ) {}

  async create({ desc_img }): Promise<Desc_img[]> {
    const imageUrls = await this.filesService.uploadFiles(desc_img);

    const savedProductImgs = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const img = new Desc_img();
      img.image_url = imageUrls[i]; // 업로드된 이미지 URL 할당

      const savedImg = await this.DescImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }
    console.log('설명url', savedProductImgs);
    // 추가된 엔티티 리턴
    return savedProductImgs;
  }
}
