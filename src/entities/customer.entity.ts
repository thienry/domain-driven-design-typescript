import { Address } from './address.entity'

class Customer {
  constructor(
    private id: string,
    private name: string,
    private address?: Address,
    private isActive = false
  ) {
    if (this.address) {
      this.changeAddress(this.address)
    }
    this.validate()
  }

  validate() {
    if (!this.id) {
      throw new Error('Customer ID is required')
    }
    if (!this.name) {
      throw new Error('Customer name is required')
    }
  }

  getId() {
    return this.id
  }

  changeName(name: string) {
    this.name = name
  }

  activate() {
    if (!this.address) throw new Error('Customer address is required')
    this.isActive = true
  }

  deactivate() {
    this.isActive = false
  }

  changeAddress(address: Address) {
    this.address = address
  }
}

export { Customer }
