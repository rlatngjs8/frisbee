// import { Args, Query, Resolver } from '@nestjs/graphql';
// import { ProductReviewService } from './product_reviews.service';
// import { Product_review } from './entities/product_review.entity';

// @Resolver(() => Product_review) // Product_review 객체 유형을 명시
// export class ProductReviewResolver {
//   constructor(private readonly productReviewService: ProductReviewService) {}

//   @Query(() => [Product_review])
//   fetchReviews(): Promise<Product_review[]> {
//     return this.productReviewService.findAll();
//   }

//   // 한개조회
//   @Query(() => Product_review)
//   fetchReview(@Args('review_no') review_no: number): Promise<Product_review> {
//     return this.productReviewService.findOne({ review_no });
//   }
// }
