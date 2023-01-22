import * as yup from 'yup'

import { Customer } from './customer.entity'
import { Validator } from '../@shared/validator/validator.interface'

export class CustomerYupValidator implements Validator<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID is required!'),
          name: yup.string().required('Name is required!'),
        })
        .validateSync({ id: entity.id, name: entity.name }, { abortEarly: false })
    } catch (errors) {
      const e = errors as yup.ValidationError
      for (const error of e.errors) {
        entity.notification.addError({ context: 'customer', message: error })
      }
    }
  }
}
