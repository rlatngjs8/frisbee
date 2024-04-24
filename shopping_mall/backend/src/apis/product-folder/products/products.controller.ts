import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ApiConsumes, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Controller('product')
@ApiTags('Product API')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 상품조회', description: '모든 상품을 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 모든 상품을 가져옴.', type: Product, isArray: true })
  async fetchProducts(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':product_no')
  @ApiOperation({ summary: '특정 상품조회', description: '특정 상품을 조회합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 특정 상품을 가져옴', type: Product })
  async fetchProduct(@Param('product_no') product_no: number): Promise<Product> {
    return await this.productsService.findOne({ product_no });
  }
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'product_img', maxCount: 5 },
      { name: 'desc_img', maxCount: 5 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '상품등록', description: '상품을 등록합니다.' })
  @ApiCreatedResponse({ description: '상품등록완료', type: Product })
  async createProduct(@Body() createProductInput: CreateProductInput, @UploadedFiles() files: Express.Multer.File[]): Promise<Product> {
    console.log('받아온 데이터:', createProductInput);

    console.log('상품 이미지: ', files['product_img']);
    console.log('설명 이미지: ', files['desc_img']);
    return await this.productsService.create({
      createProductInput,
      product_img: files['product_img'],
      desc_img: files['desc_img'],
    });
  }

  @Patch(':product_no')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'product_img', maxCount: 5 },
      { name: 'desc_img', maxCount: 5 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '상품수정', description: '상품정보를 수정합니다.' })
  @ApiCreatedResponse({ description: '상품수정완료', type: Product })
  async updateProduct(@Param('product_no') product_no: number, @Body() updateProductInput: UpdateProductInput, @UploadedFiles() files: Express.Multer.File[]): Promise<Product> {
    console.log('업로드 파일', files['product_img']);
    return await this.productsService.update({
      product_no,
      updateProductInput,
      product_img: files['product_img'],
      desc_img: files['desc_img'],
    });
  }

  @Delete(':product_no')
  @ApiOperation({ summary: '상품삭제', description: '상품을 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 상품 삭제됨' })
  async deleteProduct(@Param('product_no') product_no: number): Promise<string> {
    return await this.productsService.delete(product_no);
  }
}
