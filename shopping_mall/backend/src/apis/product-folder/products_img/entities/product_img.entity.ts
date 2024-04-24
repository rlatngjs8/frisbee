import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Product_img {
  @PrimaryGeneratedColumn('increment')
  image_no: number;

  @Column()
  image_url: string;

  @Column({ default: false })
  is_main: boolean;

  // 상품이미지(1대다 연결)
  @ManyToOne(() => Product, (product) => product.product_img, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_no' })
  product_no: Product;
}
