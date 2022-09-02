import { Sequelize } from 'sequelize-typescript'

import { Address } from '../../src/domain/customer/address.entity'
import { Customer } from '../../src/domain/customer/customer.entity'
import { CustomerModel } from '../../src/infra/customer/repository/sequelize/customer.model'
import { CustomerRepository } from '../../src/infra/customer/repository/sequelize/customer.repository'

describe('CustomerRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => await sequelize.close())

  it('should create a customer', async () => {
    const customerRepo = new CustomerRepository()
    const newCustomer = new Customer('1', 'John Doe')
    const address = new Address('Street', 1, 'City', '12345')
    newCustomer.changeAddress(address)
    await customerRepo.create(newCustomer)

    const customer = await CustomerModel.findOne({ where: { id: '1' } })
    expect(customer).toBeDefined()
    expect(customer?.toJSON()).toEqual({
      id: '1',
      name: newCustomer?.name,
      city: address?.city,
      street: address?.street,
      number: address?.number,
      zipcode: address?.zipcode,
      active: newCustomer?.isActive,
      rewardPoints: newCustomer?.rewardPoints,
    })
  })

  it('should find all customers', async () => {
    const customerRepo = new CustomerRepository()
    const newCustomer = new Customer('1', 'John Doe')
    const address = new Address('Street', 1, 'City', '12345')
    newCustomer.changeAddress(address)
    await customerRepo.create(newCustomer)

    const customers = await customerRepo.findAll()
    expect(customers).toHaveLength(1)
    expect(customers[0]).toEqual(newCustomer)
  })

  it('should find a customer', async () => {
    const customerRepo = new CustomerRepository()
    const newCustomer = new Customer('1', 'John Doe')
    const address = new Address('Street', 1, 'City', '12345')
    newCustomer.changeAddress(address)
    await customerRepo.create(newCustomer)

    const customer = await customerRepo.findById(newCustomer.id)
    expect(newCustomer).toStrictEqual(customer)
  })

  it('should delete a customer', async () => {
    const customerRepo = new CustomerRepository()
    const newCustomer = new Customer('1', 'John Doe')
    const address = new Address('Street', 1, 'City', '12345')
    newCustomer.changeAddress(address)
    await customerRepo.create(newCustomer)

    await customerRepo.delete('1')
    const customer = await CustomerModel.findOne({ where: { id: '1' } })
    expect(customer).toBeNull()
  })

  it('should update a customer', async () => {
    const customerRepo = new CustomerRepository()
    const newCustomer = new Customer('1', 'John Doe')
    const address = new Address('Street', 1, 'City', '12345')
    newCustomer.changeAddress(address)
    await customerRepo.create(newCustomer)

    newCustomer.changeName('Jane Doe')
    await customerRepo.update(newCustomer)
    const customer = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customer?.toJSON()).toStrictEqual({
      id: '1',
      name: newCustomer?.name,
      city: address?.city,
      street: address?.street,
      number: address?.number,
      zipcode: address?.zipcode,
      active: newCustomer?.isActive,
      rewardPoints: newCustomer?.rewardPoints,
    })
  })
})
