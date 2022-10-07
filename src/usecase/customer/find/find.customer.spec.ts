import { Sequelize } from 'sequelize-typescript'

import { FindCustomerUseCase } from './find.customer.usecase'
import { Address } from '../../../domain/customer/address.entity'
import { Customer } from '../../../domain/customer/customer.entity'
import { CustomerModel } from '../../../infra/customer/repository/sequelize/customer.model'
import { CustomerRepository } from '../../../infra/customer/repository/sequelize/customer.repository'

describe('Integration Test find customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      logging: false,
      dialect: 'sqlite',
      storage: ':memory:',
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => await sequelize.close())

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer('123', 'John Doe')
    const address = new Address('Rua 2', 123, 'Franco', '123443')
    customer.changeAddress(address)
    await customerRepository.create(customer)

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
})
