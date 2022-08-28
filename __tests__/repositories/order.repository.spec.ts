import { Sequelize } from 'sequelize-typescript'

import { Order } from '../../src/domain/entities/order.entity'
import { Address } from '../../src/domain/entities/address.entity'
import { Product } from '../../src/domain/entities/product.entity'
import { Customer } from '../../src/domain/entities/customer.entity'
import { OrderItem } from '../../src/domain/entities/order-item.entity'

import { OrderRepository } from '../../src/infra/repositories/order.repository'
import { ProductRepository } from '../../src/infra/repositories/product.repository'
import { CustomerRepository } from '../../src/infra/repositories/customer.repository'

import { OrderModel } from '../../src/infra/database/sequelize/models/order.model'
import { ProductModel } from '../../src/infra/database/sequelize/models/product.model'
import { CustomerModel } from '../../src/infra/database/sequelize/models/customer.model'
import { OrderItemModel } from '../../src/infra/database/sequelize/models/order-item.model'

describe('Order repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => await sequelize.close())

  it('should create an order', async () => {
    const customerRepo = new CustomerRepository()
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 123, 'City', '1234-5')

    customer.changeAddress(address)
    await customerRepo.create(customer)

    const productRepo = new ProductRepository()
    const product = new Product('123', 'Product', 100)
    await productRepo.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, 1, product.id)
    const order = new Order('123', customer.id, [orderItem])

    const orderRepo = new OrderRepository()
    await orderRepo.create(order)

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] })

    expect(orderModel).toBeDefined()
    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          order_id: order.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
        },
      ],
    })
  })

  it('should find all orders', async () => {
    const customerRepo = new CustomerRepository()
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 123, 'City', '1234-5')

    customer.changeAddress(address)
    await customerRepo.create(customer)

    const productRepo = new ProductRepository()
    const product = new Product('123', 'Product', 100)
    await productRepo.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, 1, product.id)
    const order = new Order('123', customer.id, [orderItem])

    const orderRepo = new OrderRepository()
    await orderRepo.create(order)

    const orders = await orderRepo.findAll()

    expect(orders).toHaveLength(1)
    expect([order]).toEqual(orders)
  })

  it('should find an order', async () => {
    const customerRepo = new CustomerRepository()
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 123, 'City', '1234-5')

    customer.changeAddress(address)
    await customerRepo.create(customer)

    const productRepo = new ProductRepository()
    const product = new Product('123', 'Product', 100)
    await productRepo.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, 1, product.id)
    const newOrder = new Order('123', customer.id, [orderItem])

    const orderRepo = new OrderRepository()
    await orderRepo.create(newOrder)

    const order = await orderRepo.findById(newOrder.id)

    expect(newOrder).toStrictEqual(order)
  })

  it('should update an order', async () => {
    const customerRepo = new CustomerRepository()
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 123, 'City', '1234-5')

    customer.changeAddress(address)
    await customerRepo.create(customer)

    const productRepo = new ProductRepository()
    const product = new Product('123', 'Product', 100)
    await productRepo.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, 1, product.id)
    const newOrder = new Order('123', customer.id, [orderItem])

    const orderRepo = new OrderRepository()
    await orderRepo.create(newOrder)

    product.changeName('Updated product')
    product.changePrice(200)

    const newOrderItem = new OrderItem('1', product.name, product.price, 1, product.id)
    newOrder.changeItems([newOrderItem])

    await orderRepo.update(newOrder)

    const order = await OrderModel.findOne({
      where: { id: newOrder.id },
      include: [{ model: OrderItemModel }],
    })

    expect(order?.toJSON()).toStrictEqual({
      id: newOrder.id,
      total: newOrder.total(),
      customer_id: newOrder.customerId,
      items: [
        {
          id: newOrderItem.id,
          order_id: newOrder.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
        },
      ],
    })
  })

  it('should delete an order', async () => {
    const customerRepo = new CustomerRepository()
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 123, 'City', '1234-5')

    customer.changeAddress(address)
    await customerRepo.create(customer)

    const productRepo = new ProductRepository()
    const product = new Product('123', 'Product', 100)
    await productRepo.create(product)

    const orderItem = new OrderItem('123', product.name, product.price, 1, product.id)
    const newOrder = new Order('123', customer.id, [orderItem])

    const orderRepo = new OrderRepository()
    await orderRepo.create(newOrder)

    await orderRepo.delete(newOrder.id)
    const order = await orderRepo.findById(newOrder.id)

    expect(order).toBeNull()
  })
})
