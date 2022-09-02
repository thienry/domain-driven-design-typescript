class Address {
  constructor(
    private _street: string,
    private _number = 0,
    private _city: string,
    private _zipcode: string
  ) {
    this.validate()
  }

  validate() {
    if (!this._number) {
      throw new Error('Address number is required')
    }
    if (!this._city) {
      throw new Error('Address city is required')
    }
    if (!this._street) {
      throw new Error('Address street is required')
    }
    if (!this._zipcode) {
      throw new Error('Address zipcode is required')
    }
  }

  get street() {
    return this._street
  }

  get number() {
    return this._number
  }

  get city() {
    return this._city
  }

  get zipcode() {
    return this._zipcode
  }

  toString() {
    return `${this._number}, ${this._street}, ${this._city} - ${this._zipcode}`
  }
}

export { Address }
