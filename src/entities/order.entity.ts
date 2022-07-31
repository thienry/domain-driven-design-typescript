import { OrderItem } from './order-item.entity'

class Order {
  constructor(
    private _id: string,
    private _total: number,
    private _customerId: string,
    private _items: OrderItem[] = []
  ) {
    this._total = this.total()
    this.validate()
  }

  validate() {
    if (!this._id) {
      throw new Error('Order ID is required')
    }
    if (!this._customerId) {
      throw new Error('Customer ID is required')
    }
    if (!this._items || this._items.length === 0) {
      throw new Error('Order must have at least one item')
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0)
  }

  toString() {
    const itemsString = this._items.map((item) => item.toString()).join(', ')
    return `Order ${this._id} for customer ${this._customerId} with items: ${itemsString}`
  }
}

export { Order }
