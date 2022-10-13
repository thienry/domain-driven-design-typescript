import { Address } from '../../../domain/customer/address.entity'
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update.customer.dto'
import { CustomerRepository } from '../../../infra/customer/repository/sequelize/customer.repository'

class UpdateCustomerUseCase {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepo.findById(input.id)
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.city,
      input.address.zipcode
    )

    customer.changeName(input.name)
    customer.changeAddress(address)

    await this.customerRepo.update(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: input.address.city,
        number: input.address.number,
        street: input.address.street,
        zipcode: input.address.zipcode,
      },
    }
  }
}

export { UpdateCustomerUseCase }
