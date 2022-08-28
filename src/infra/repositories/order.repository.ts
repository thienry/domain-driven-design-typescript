import { Order } from '../../domain/entities/order.entity'
import { OrderItem } from '../../domain/entities/order-item.entity'
import { OrderModel } from '../database/sequelize/models/order.model'
import { IRepository } from '../../domain/repositories/repository.interface'
import { OrderItemModel } from '../database/sequelize/models/order-item.model'

class OrderRepository implements IRepository<Order> {
  /**
   * Find all orders
   *
   * @returns Promise<Order[]>
   */
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] })

    return orderModels.map((orderModel) => {
      const orderItems = orderModel?.items.map(
        (item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id)
      )

      return new Order(orderModel.id, orderModel.customer_id, orderItems)
    })
  }

  /**
   * Find an order by id
   *
   * @param order - Order to update
   *
   * @returns Promise<void>
   */
  async update(order: Order): Promise<void> {
    await OrderModel.update(
      {
        id: order.id,
        total: order.total(),
        customer_id: order.customerId,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        })),
      },
      { where: { id: order.id } }
    )
  }

  /**
   * Delete an order by id
   *
   * @param id - Order id to delete
   *
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    await OrderModel.destroy({ where: { id } })
  }

  /**
   * Create an order
   *
   * @param order - Order to create
   *
   * @returns Promise<void>
   */
  async create(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id,
        total: order.total(),
        customer_id: order.customerId,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    )
  }

  /**
   * Find an order by id
   *
   * @param id - Order id to find
   *
   * @returns Promise<Order>
   */
  async findById(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ['items'],
    })

    const orderItems = orderModel?.items.map(
      (item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id)
    )

    return new Order(id, orderModel.customer_id, orderItems)
  }
}

export { OrderRepository }
