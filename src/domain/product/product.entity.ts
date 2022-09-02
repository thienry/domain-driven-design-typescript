class Product {
  constructor(private _id: string, private _name: string, private _price: number) {
    this.validate()
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changePrice(price: number) {
    this._price = price
    this.validate()
  }

  validate() {
    if (!this._id) {
      throw new Error('ID is required')
    }
    if (!this._name) {
      throw new Error('Name is required')
    }
    if (this._price < 0) {
      throw new Error('Price must be greater than 0')
    }
  }
}

export { Product }
