import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Product } from 'src/apis/product-folder/products/entities/product.entity';
import { Cart } from '../../carts/entities/cart.entity';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn('increment')
  cart_product_no: number;

  @ManyToOne(() => Product, (product) => product.cart_product)
  @JoinColumn({ name: 'product_no' })
  product_no: Product;

  @ManyToOne(() => Cart, (cart) => cart.cart_product)
  @JoinColumn({ name: 'cart_no' })
  cart_no: Cart;

  @Column()
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  createAt: Date;
}
