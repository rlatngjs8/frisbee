import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product_review } from '../../product_reviews/entities/product_review.entity';
import { User } from 'src/apis/user-folder/users/entities/user.entity';

@Entity()
export class Product_review_comment {
  @PrimaryGeneratedColumn('increment')
  review_comment_no: number;

  @ManyToOne(() => Product_review, (product_review) => product_review.product_review_comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_no' })
  review_no: Product_review;

  @Column()
  comment: string;

  // 작성자(사용자 넘버) 다대1
  @ManyToOne(() => User, (user) => user.product_review_comment)
  @JoinColumn({ name: 'user_no' })
  user_no: User;

  @CreateDateColumn()
  createAt: Date;
}
