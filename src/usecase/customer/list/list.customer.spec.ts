import { Address } from '../../../domain/customer/address.entity'
import { CustomerFactory } from '../../../domain/customer/customer.factory'
import { ListCustomersUseCase } from './list.customer.usecase'

const address1 = new Address('street', 123, 'city', '090930')
const customer1 = CustomerFactory.createWithAddress('John Doe', address1)

const address2 = new Address('street 2', 345, 'city', '0934956')
const customer2 = CustomerFactory.createWithAddress('Jane Doe', address2)

const MockRepo = () => ({
  create: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
})

describe('Unit test for listing customers use case', () => {
  it('should list customers', async () => {
    const repo = MockRepo()
    const usecase = new ListCustomersUseCase(repo)

    const output = await usecase.execute({})

    expect(output.customers.length).toBe(2)
    expect(output.customers.at(0).id).toBe(customer1.id)
    expect(output.customers.at(1).id).toBe(customer2.id)
    expect(output.customers.at(0).name).toBe(customer1.name)
    expect(output.customers.at(1).name).toBe(customer2.name)
    expect(output.customers.at(0).address.street).toBe(customer1.address.street)
    expect(output.customers.at(1).address.street).toBe(customer2.address.street)
  })
})
