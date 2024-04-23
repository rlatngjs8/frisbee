import { PartialType } from '@nestjs/swagger';
import { ProductInformationInput } from './product-information.input';

export class UpdateProductInfo extends PartialType(ProductInformationInput) {}
