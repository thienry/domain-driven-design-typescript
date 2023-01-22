import * as yup from 'yup'

import { Product } from './product.entity'
import { Validator } from '../@shared/validator/validator.interface'

export class ProductYupValidator implements Validator<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID is required!'),
          name: yup.string().required('Name is required!'),
          price: yup.number().min(1, 'Price must be greater than 0!'),
        })
        .validateSync(
          { id: entity.id, name: entity.name, price: entity.price },
          { abortEarly: false }
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      for (const error of e.errors) {
        entity.notification.addError({ context: 'product', message: error })
      }
    }
  }
}
