import { Address } from '../../src/domain/customer/address.entity'
import { CustomerFactory } from '../../src/domain/customer/customer.factory'

describe('Customer factory unit tests', () => {
  it('Should create customer', () => {
    const customer = CustomerFactory.create('John Doe')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John Doe')
    expect(customer.address).toBeUndefined()
  })

  it('Should create customer with an address', () => {
    const address = new Address('Rua 2', 123, 'Valinor', 'xxxx-xxx')
    const customer = CustomerFactory.createWithAddress('John Doe', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John Doe')
    expect(customer.address).toBe(address)
  })
})
