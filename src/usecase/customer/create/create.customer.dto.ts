interface InputCreateCustomerDto {
  name: string
  address: {
    city: string
    number: number
    street: string
    zipcode: string
  }
}

interface OutputCreateCustomerDto {
  id: string
  name: string
  address: {
    city: string
    number: number
    street: string
    zipcode: string
  }
}

export { InputCreateCustomerDto, OutputCreateCustomerDto }
