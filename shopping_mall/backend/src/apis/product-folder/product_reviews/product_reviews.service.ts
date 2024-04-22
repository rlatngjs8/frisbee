import { Repository } from 'typeorm';
import { Product_review } from './entities/product_review.entity';
import { InjectRepository } from '@nestjs/typeorm';

interface IProductReviewServiceFindOne {
  review_no: number;
}

export class ProductReviewService {
  constructor(
    @InjectRepository(Product_review)
    private readonly productReviewRepository: Repository<Product_review>,
  ) {}

  findAll(): Promise<Product_review[]> {
    return this.productReviewRepository.find({ relations: ['product_review_comment'] });
  }
  findOne({ review_no }: IProductReviewServiceFindOne): Promise<Product_review> {
    return this.productReviewRepository.findOne({ where: { review_no: review_no }, relations: ['product_review_comment'] });
  }
}
