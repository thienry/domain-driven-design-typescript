import { Customer } from '../../../domain/customer/customer.entity'
import { InputListCustomerDto, OutputListCustomerDto } from './list.customer.dto'
import { CustomerRepository } from '../../../infra/customer/repository/sequelize/customer.repository'

class ListCustomersUseCase {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async execute(_: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepo.findAll()
    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          city: customer.address.city,
          number: customer.address.number,
          street: customer.address.street,
          zipcode: customer.address.zipcode,
        },
      })),
    }
  }
}

export { ListCustomersUseCase }
