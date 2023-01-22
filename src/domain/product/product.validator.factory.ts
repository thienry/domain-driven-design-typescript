import { Product } from './product.entity'
import { ProductYupValidator } from './product.yup.validator'
import { Validator } from '../@shared/validator/validator.interface'

export class ProductValidatorFactory {
  static create(): Validator<Product> {
    return new ProductYupValidator()
  }
}
