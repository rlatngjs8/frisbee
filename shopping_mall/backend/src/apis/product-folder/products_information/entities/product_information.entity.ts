import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Product_information {
  @PrimaryGeneratedColumn('increment')
  info_no: number;

  // 상품이랑 1대1 연결
  @JoinColumn({ name: 'product_no' })
  @OneToOne(() => Product)
  product_no: Product;

  @Column()
  model_name: string;

  @Column()
  voltage: string;

  @Column()
  release_date: string;

  @Column()
  made_country: string;

  @Column()
  spec: string;

  @Column()
  inquiry: string;

  @Column()
  authentication: string;

  @Column()
  energy: string;

  @Column()
  manufacturer: string;

  @Column()
  size: string;

  @Column()
  assurance: string;
}
