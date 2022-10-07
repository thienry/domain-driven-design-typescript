import { FindCustomerUseCase } from './find.customer.usecase'
import { Address } from '../../../domain/customer/address.entity'
import { Customer } from '../../../domain/customer/customer.entity'
import { ICustomerRepository } from '../../../domain/customer/customer-repository.interface'

const customer = new Customer('123', 'John Doe')
const address = new Address('Rua 2', 123, 'Franco', '123443')
customer.changeAddress(address)

const MockRepo = () => ({
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
})

describe('Unit tests find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepo()
    const usecase = new FindCustomerUseCase(customerRepository as unknown as ICustomerRepository)

    const input = { id: customer.id }
    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zipcode: customer.address.zipcode,
      },
    }

    const customerResult = await usecase.execute(input)

    expect(customerResult).toEqual(output)
  })

  it('should thows when a customer not found', async () => {
    const customerRepository = MockRepo()
    customerRepository.findById.mockImplementation(() => {
      throw new Error()
    })
    const usecase = new FindCustomerUseCase(customerRepository as unknown as ICustomerRepository)
    const input = { id: '123' }

    expect(async () => await usecase.execute(input)).rejects.toThrowError()
  })
})
