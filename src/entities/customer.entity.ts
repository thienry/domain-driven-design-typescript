import { Address } from './address.entity'

class Customer {
  constructor(
    private _id: string,
    private _name: string,
    private _address?: Address,
    private _isActive = false
  ) {
    if (this._address) {
      this.changeAddress(this._address)
    }
    this.validate()
  }

  validate() {
    if (!this._id) {
      throw new Error('Customer ID is required')
    }
    if (!this._name) {
      throw new Error('Customer name is required')
    }
  }

  get id() {
    return this._id
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
}

export { Customer }
