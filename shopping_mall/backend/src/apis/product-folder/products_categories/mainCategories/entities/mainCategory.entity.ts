import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MiddleCategory } from '../../middleCategories/entities/middleCategory.entity';

@Entity()
export class MainCategory {
  @PrimaryGeneratedColumn('increment')
  main_category_no: number;

  @Column()
  main_category_name: string;

  @OneToMany(() => MiddleCategory, (middleCategory) => middleCategory.mainCategory)
  middle_category_no: MiddleCategory[];
}
