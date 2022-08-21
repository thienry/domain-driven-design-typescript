import { IRepository } from './repository.interface'
import { Customer } from '../entities/customer.entity'

type ICustomerRepository = IRepository<Customer>

export { ICustomerRepository }
