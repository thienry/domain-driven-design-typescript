import { CreateCustomerUseCase } from './create.customer.usecase'
import { ICustomerRepository } from '../../../domain/customer/customer-repository.interface'

const input = {
  name: 'John Doe',
  address: {
    city: 'City',
    number: 123,
    street: 'Street',
    zipcode: 'Zipcode',
  },
}

const MockRepo = () =>
  ({
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  } as unknown as ICustomerRepository)

describe('Unit tests create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepo()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    const output = await createCustomerUseCase.execute(input)
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        city: input.address.city,
        number: input.address.number,
        street: input.address.street,
        zipcode: input.address.zipcode,
      },
    })
  })

  it('should throws when name is missing', async () => {
    const customerRepo = MockRepo()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepo)

    input.name = ''

    expect(createCustomerUseCase.execute(input)).rejects.toThrowError()
  })

  it('should throws when street address is missing', async () => {
    const customerRepo = MockRepo()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepo)

    input.address.street = ''

    expect(createCustomerUseCase.execute(input)).rejects.toThrowError()
  })
})
