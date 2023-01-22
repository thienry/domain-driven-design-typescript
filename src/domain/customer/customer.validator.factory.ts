import { Customer } from './customer.entity'
import { CustomerYupValidator } from './customer.yup.validator'
import { Validator } from '../@shared/validator/validator.interface'

export class CustomerValidatorFactory {
  static create(): Validator<Customer> {
    return new CustomerYupValidator()
  }
}
