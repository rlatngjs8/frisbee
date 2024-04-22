import { Product } from 'src/apis/product-folder/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MiddleCategory } from '../../middleCategories/entities/middleCategory.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn('increment')
  sub_category_no: number;

  @Column()
  sub_category_name: string;

  @OneToMany(() => Product, (product) => product.subCategory)
  product_no: Product[];

  @ManyToOne(() => MiddleCategory, (middleCategory) => middleCategory.sub_category_no)
  @JoinColumn({ name: 'middleCategory' })
  middleCategory: MiddleCategory;
}
