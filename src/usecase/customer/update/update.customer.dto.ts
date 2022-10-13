interface InputUpdateCustomerDto {
  id: string
  name: string
  address: {
    city: string
    number: number
    street: string
    zipcode: string
  }
}

interface OutputUpdateCustomerDto {
  id: string
  name: string
  address: {
    city: string
    number: number
    street: string
    zipcode: string
  }
}

export { InputUpdateCustomerDto, OutputUpdateCustomerDto }
