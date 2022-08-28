import { OrderItem } from './order-item.entity'

class Order {
  private _total: number

  constructor(private _id: string, private _customerId: string, private _items: OrderItem[] = []) {
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

  get id(): string {
    return this._id
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  changeItems(items: OrderItem[]) {
    this._items = items
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
