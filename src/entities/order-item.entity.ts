class OrderItem {
  constructor(
    private _id: string,
    private _name: string,
    private _price: number,
    private _quantity: number,
    private _productId: string
  ) {
    this.validate()
  }

  get price() {
    return this._price * this._quantity
  }

  validate() {
    if (!this._id) {
      throw new Error('OrderItem ID is required')
    }
    if (!this._name) {
      throw new Error('OrderItem name is required')
    }
    if (!this._price) {
      throw new Error('OrderItem price is required')
    }
    if (!this._quantity || this._quantity <= 0) {
      throw new Error('OrderItem quantity is required and must be greater than 0')
    }
    if (!this._productId) {
      throw new Error('OrderItem product ID is required')
    }
  }

  toString() {
    return `${this._name} (${this._price})`
  }
}

export { OrderItem }
