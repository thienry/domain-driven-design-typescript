import { Address } from '../../domain/entities/address.entity'
import { Customer } from '../../domain/entities/customer.entity'
import { CustomerModel } from '../database/sequelize/models/customer.model'
import { ICustomerRepository } from '../../domain/repositories/customer-repository.interface'

class CustomerRepository implements ICustomerRepository {
  /**
   * @description Find all customers
   * @returns Promise<Customer[]>
   */
  async findAll(): Promise<Customer[]> {
    const customerModel = await CustomerModel.findAll()

    const customers = customerModel.map((customer) => {
      const currentCustomer = new Customer(customer.id, customer.name)
      currentCustomer.addRewardPoints(customer.rewardPoints)
      const address = new Address(customer.street, customer.number, customer.city, customer.zipcode)
      currentCustomer.changeAddress(address)

      if (customer.active) {
        currentCustomer.activate()
      }

      return currentCustomer
    })

    return customers
  }

  /**
   * @description Update customer
   * @param customer Customer
   * @returns Promise<void>
   */
  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: customer.name,
        active: customer.isActive,
        city: customer.address.city,
        street: customer.address.street,
        number: customer.address.number,
        zipcode: customer.address.zipcode,
        rewardPoints: customer.rewardPoints,
      },
      { where: { id: customer.id } }
    )
  }

  /**
   * @description Deletes a customer
   * @param id Customer id
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({ where: { id } })
  }

  /**
   * @description create a new customer
   * @param customer Customer
   * @returns Promise<void>
   */
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      active: customer.isActive,
      city: customer.address.city,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      rewardPoints: customer.rewardPoints,
    })
  }

  /**
   * @description Find customer by id
   * @param id Customer id
   * @returns Promise<Customer>
   */
  async findById(id: string): Promise<Customer | undefined> {
    const customerModel = await CustomerModel.findOne({ where: { id } })
    const customer = new Customer(id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.zipcode
    )
    customer.changeAddress(address)
    return customer
  }
}

export { CustomerRepository }
