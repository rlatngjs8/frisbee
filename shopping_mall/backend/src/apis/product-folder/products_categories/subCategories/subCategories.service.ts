import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoriesRepository: Repository<SubCategory>,
  ) {}

  async create({ subCategory }) {
    return this.subCategoriesRepository.save({ ...subCategory });
  }

  async findOne({ sub_category_no }: ISubCategoriesServiceFindOne): Promise<SubCategory> {
    console.log('넘어온 서브카테고리 넘버', sub_category_no);
    const result = await this.subCategoriesRepository.findOne({ where: { sub_category_no } });

    console.log('서브카테고리', result);
    return result;
  }
}

interface ISubCategoriesServiceFindOne {
  sub_category_no: number;
}
