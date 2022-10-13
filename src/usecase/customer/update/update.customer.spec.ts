import { Address } from '../../../domain/customer/address.entity'
import { CustomerFactory } from '../../../domain/customer/customer.factory'
import { UpdateCustomerUseCase } from './update.customer.usecase'

const address = new Address('street', 123, 'city', '090930')
const customer = CustomerFactory.createWithAddress('John Doe', address)

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street updated',
    city: 'city updated',
    zipcode: 'zipcode updated',
    number: 12334,
  },
}

const MockRepo = () => ({
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
  delete: jest.fn(),
})

describe('Unit test for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepo = MockRepo()
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepo)

    const output = await updateCustomerUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
