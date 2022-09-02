import { OrderItem } from './order-item.entity'
import { Order } from './order.entity'
import { IOrder } from './order.interface'

class OrderFactory {
  static create(props: IOrder): Order {
    const items = props.items.map(
      (item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.productId)
    )

    return new Order(props.id, props.customerId, items)
  }
}

export { OrderFactory }
