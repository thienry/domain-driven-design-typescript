import { Address } from '../../src/domain/customer/address.entity'
import { Customer } from '../../src/domain/customer/customer.entity'

describe('Customer unit tests', () => {
  it('Should throws an error when ID is empty', () => {
    expect(() => new Customer('', 'Thiago')).toThrowError('Customer ID is required')
  })

  it('Should throws an error when name is empty', () => {
    expect(() => new Customer('123', '')).toThrowError('Customer name is required')
  })

  it('Should change name', () => {
    // Arrange
    const customer = new Customer('123', 'Thiago')

    // Act
    customer.changeName('João')

    // Assert
    expect(customer.name).toBe('João')
  })

  it('Should change address', () => {
    // Arrange
    const customer = new Customer('123', 'Thiago')
    const address = new Address('Rua 1', 191, 'City', '12345-678')

    // Act
    customer.changeAddress(address)

    // Assert
    expect(customer.address).toBe(address)
  })

  it('Should activate a customer', () => {
    // Arrange
    const customer = new Customer('123', 'Thiago')
    const address = new Address('Rua 1', 191, 'City', '12345-678')
    customer.changeAddress(address)

    // Act
    customer.activate()

    // Assert
    expect(customer.isActive).toBe(true)
  })

  it('Should deactivate a customer', () => {
    // Arrange
    const customer = new Customer('123', 'Thiago')
    const address = new Address('Rua 1', 191, 'City', '12345-678')
    customer.changeAddress(address)
    customer.activate()

    // Act
    customer.deactivate()

    // Assert
    expect(customer.isActive).toBe(false)
  })

  it('Should throws an error when address is empty', () => {
    expect(() => {
      const customer = new Customer('123', 'Thiago')
      customer.activate()
    }).toThrowError('Customer address is required')
  })
})
