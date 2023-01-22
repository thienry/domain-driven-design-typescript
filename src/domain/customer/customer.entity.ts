import { Address } from './address.entity'
import { Entity } from '../@shared/entity/entity.abstract'
import { NotificationError } from '../@shared/notification/notification.error'

class Customer extends Entity {
  private _name = ''
  private _isActive = false
  private _rewardPoints = 0
  private _address?: Address

  constructor(id: string, name: string) {
    super()

    this._id = id
    this._name = name

    if (this._address) {
      this.changeAddress(this._address)
    }

    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  validate() {
    if (!this.id) {
      this.notification.addError({ context: 'customer', message: 'ID is required!' })
    }
    if (!this._name) {
      this.notification.addError({ context: 'customer', message: 'Name is required!' })
    }
  }

  get name() {
    return this._name
  }

  get isActive() {
    return this._isActive
  }

  get address() {
    return this._address
  }

  get rewardPoints() {
    return this._rewardPoints
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  activate() {
    if (!this._address) throw new Error('Customer address is required')
    this._isActive = true
  }

  deactivate() {
    this._isActive = false
  }

  changeAddress(address: Address) {
    this._address = address
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }
}

export { Customer }
