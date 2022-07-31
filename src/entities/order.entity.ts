import { OrderItem } from './order-item.entity'

class Order {
  constructor(private id: string, private customerId: string, private items: OrderItem[] = []) {}

  toString() {
    const itemsString = this.items.map((item) => item.toString()).join(', ')
    return `Order ${this.id} for customer ${this.customerId} with items: ${itemsString}`
  }
}

export { Order }
