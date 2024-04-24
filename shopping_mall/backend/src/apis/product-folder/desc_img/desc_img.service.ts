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
      img.image_url = imageUrls[i];

      const savedImg = await this.descImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }
    console.log('설명url', savedProductImgs);
    return savedProductImgs;
  }
  async update(product_no, desc_img): Promise<Desc_img[]> {
    await this.delete({ product_no });

    const imageUrls = await this.filesService.uploadFiles(desc_img);

    const savedProductImgs = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const img = new Desc_img();
      img.image_url = imageUrls[i];
      img.product_no = product_no;

      const savedImg = await this.descImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }

    return savedProductImgs;
  }

  async delete(product_no): Promise<void> {
    const imagesToDelete = await this.descImgsRepository.find({ where: product_no });

    for (const image of imagesToDelete) {
      await this.filesService.deleteImages([image.image_url]);
      await this.descImgsRepository.delete(image);
    }
  }
}
