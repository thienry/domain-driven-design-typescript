import { OrderModel } from './order.model'
import { OrderItemModel } from './order-item.model'
import { Order } from '../../../../domain/checkout/order.entity'
import { OrderItem } from '../../../../domain/checkout/order-item.entity'
import { IRepository } from '../../../../domain/@shared/repository/repository.interface'

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
    const sequelize = OrderModel.sequelize
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({ where: { order_id: order.id }, transaction: t })
      const items = order.items.map((item) => ({
        id: item.id,
        order_id: order.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
      }))

      await OrderItemModel.bulkCreate(items, { transaction: t })
      await OrderModel.update({ total: order.total() }, { where: { id: order.id }, transaction: t })
    })
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

    if (!orderModel) return null

    const orderItems = orderModel?.items.map(
      (item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id)
    )

    return new Order(id, orderModel.customer_id, orderItems)
  }
}

export { OrderRepository }
