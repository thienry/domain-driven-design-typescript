class OrderItem {
  constructor(private _id: string, private _name: string, private _price: number) {}

  get price() {
    return this._price
  }

  toString() {
    return `${this._name} (${this._price})`
  }
}

export { OrderItem }
