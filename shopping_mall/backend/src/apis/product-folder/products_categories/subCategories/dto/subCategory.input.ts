import { PickType } from '@nestjs/swagger';
import { SubCategory } from '../entities/subCategory.entity';

export class SubCategoryInput extends PickType(SubCategory, ['sub_category_name']) {}
