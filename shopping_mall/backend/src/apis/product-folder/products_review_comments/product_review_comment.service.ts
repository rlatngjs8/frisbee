import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product_review_comment } from './entities/product_review_comment.entity';

@Injectable()
export class ProductReviewCommentService {
  constructor(
    @InjectRepository(Product_review_comment)
    private readonly productReviewCommentRepository: Repository<Product_review_comment>,
  ) {}

  async findByReviewNo(review_no: number): Promise<Product_review_comment[]> {
    return await this.productReviewCommentRepository.find({ where: { review_no: { review_no } } });
  }
}
