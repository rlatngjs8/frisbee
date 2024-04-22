import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_review } from './entities/product_review.entity';
import { ProductReviewService } from './product_reviews.service';
import { ProductReviewCommentService } from '../products_review_comments/product_review_comment.service';
import { Product_review_comment } from '../products_review_comments/entities/product_review_comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product_review, Product_review_comment])],
  providers: [ProductReviewService, ProductReviewCommentService], // 수정
  // controllers: [productReviewController],
})
export class ProductReviewModule {}
