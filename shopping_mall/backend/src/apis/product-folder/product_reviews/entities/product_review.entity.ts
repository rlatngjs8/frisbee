import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Product_review_comment } from '../../products_review_comments/entities/product_review_comment.entity';
import { User } from 'src/apis/user-folder/users/entities/user.entity';

@Entity()
export class Product_review {
  @PrimaryGeneratedColumn('increment')
  review_no: number;

  @ManyToOne(() => Product, (product) => product.product_review)
  @JoinColumn({ name: 'product_no' })
  product_no: Product;

  @Column()
  title: string;

  @Column()
  content: string;

  // 사용자넘버(대대1)
  @ManyToOne(() => User, (user) => user.product_review)
  @JoinColumn({ name: 'user_no' })
  user_no: User;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  star: number;

  @Column()
  review_url: string;

  @OneToMany(() => Product_review_comment, (product_review_comment) => product_review_comment.review_no)
  product_review_comment: Product_review_comment[];
}
