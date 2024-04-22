import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CartProduct } from '../../carts_product/entities/cart_product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('increment')
  cart_no: number;

  @JoinColumn({ name: 'user_no' })
  @OneToOne(() => User)
  user_no: User;

  // 장바구니랑 1대다
  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart_no)
  cart_product: CartProduct[];
}
