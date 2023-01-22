import { IProduct } from './product.interface'
import { Entity } from '../@shared/entity/entity.abstract'
import { NotificationError } from '../@shared/notification/notification.error'

class Product extends Entity implements IProduct {
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    super()

    this._id = id
    this._name = name
    this._price = price

    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
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
      this.notification.addError({ context: 'product', message: 'ID is required!' })
    }
    if (!this._name) {
      this.notification.addError({ context: 'product', message: 'Name is required!' })
    }
    if (this._price < 0) {
      this.notification.addError({ context: 'product', message: 'Price must be greater than 0!' })
    }
  }
}

export { Product }
