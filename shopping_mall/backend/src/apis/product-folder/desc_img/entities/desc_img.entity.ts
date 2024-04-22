import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Desc_img {
  @PrimaryGeneratedColumn('increment')
  descImg_no: number;

  @Column()
  image_url: string;

  @ManyToOne(() => Product, (product) => product.desc_img)
  @JoinColumn({ name: 'product_no' })
  product_no: Product;
}
