import { Address } from '../../../domain/customer/address.entity'
import { CustomerFactory } from '../../../domain/customer/customer.factory'
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create.customer.dto'
import { ICustomerRepository } from '../../../domain/customer/customer-repository.interface'

class CreateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const newAddress = new Address(
      input.address.street,
      input.address.number,
      input.address.city,
      input.address.zipcode
    )

    const customer = CustomerFactory.createWithAddress(input.name, newAddress)
    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zipcode: customer.address.zipcode,
      },
    }
  }
}

export { CreateCustomerUseCase }
