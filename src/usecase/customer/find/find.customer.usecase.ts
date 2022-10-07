import { InputFindCustomerDto, OutputFindCustomerDto } from './find.customer.dto'
import { ICustomerRepository } from '../../../domain/customer/customer-repository.interface'

class FindCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.findById(input.id)
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

export { FindCustomerUseCase }
