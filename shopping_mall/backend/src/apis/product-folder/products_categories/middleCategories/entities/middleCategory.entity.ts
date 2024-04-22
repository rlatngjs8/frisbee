import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from '../../subCategories/entities/subCategory.entity';
import { MainCategory } from '../../mainCategories/entities/mainCategory.entity';

@Entity()
export class MiddleCategory {
  @PrimaryGeneratedColumn('increment')
  middle_category_no: number;

  @Column()
  middle_category_name: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.middleCategory)
  sub_category_no: SubCategory[];

  @ManyToOne(() => MainCategory, (mainCategory) => mainCategory.middle_category_no)
  @JoinColumn({ name: 'mainCategory' })
  mainCategory: MainCategory;
}
