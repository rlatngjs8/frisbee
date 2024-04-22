import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product_img } from '../../products_img/entities/product_img.entity';
import { Desc_img } from '../../desc_img/entities/desc_img.entity';
import { Product_information } from '../../products_information/entities/product_information.entity';
import { Product_review } from '../../product_reviews/entities/product_review.entity';
import { SubCategory } from '../../products_categories/subCategories/entities/subCategory.entity';
import { CartProduct } from 'src/apis/user-folder/carts_product/entities/cart_product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  product_no: number;

  @Column()
  product_name: string;

  @OneToMany(() => Product_img, (product_img) => product_img.product_no)
  product_img: Product_img[];

  @Column()
  desc: string;

  @OneToMany(() => Desc_img, (desc_img) => desc_img.product_no)
  desc_img: Desc_img[];

  @Column()
  price: number;

  @Column({ default: false })
  is_soldout: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  createAt: string;

  @OneToOne(() => Product_information, (product_information) => product_information.product_no)
  product_information: Product_information;

  @OneToMany(() => Product_review, (product_review) => product_review.product_no)
  product_review: Product_review[];

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.product_no)
  @JoinColumn({ name: 'sub_category_no' })
  subCategory: SubCategory;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product_no)
  cart_product: CartProduct[];
}
