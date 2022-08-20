class Address {
  constructor(
    private street: string,
    private number = 0,
    private city: string,
    private zipcode: string
  ) {
    this.validate()
  }

  validate() {
    if (!this.number) {
      throw new Error('Address number is required')
    }
    if (!this.city) {
      throw new Error('Address city is required')
    }
    if (!this.street) {
      throw new Error('Address street is required')
    }
    if (!this.zipcode) {
      throw new Error('Address zipcode is required')
    }
  }

  toString() {
    return `${this.number}, ${this.street}, ${this.city} - ${this.zipcode}`
  }
}

export { Address }
