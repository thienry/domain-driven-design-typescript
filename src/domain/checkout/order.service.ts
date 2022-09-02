import { v4 as uuidv4 } from 'uuid'

import { Order } from './order.entity'
import { OrderItem } from './order-item.entity'
import { Customer } from '../customer/customer.entity'

class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }

  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    if (!orderItems.length) {
      throw new Error('Order must have at least one item')
    }

    const order = new Order(uuidv4(), customer.id, orderItems)
    customer.addRewardPoints(order.total() / 2)

    return order
  }
}

export { OrderService }
