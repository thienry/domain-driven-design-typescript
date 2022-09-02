import { Customer } from './customer.entity'
import { IRepository } from '../@shared/repository/repository.interface'

type ICustomerRepository = IRepository<Customer>

export { ICustomerRepository }
