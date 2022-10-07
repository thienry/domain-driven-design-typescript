interface InputFindCustomerDto {
  id: string
}

interface OutputFindCustomerDto {
  id: string
  name: string
  address: {
    city: string
    number: number
    street: string
    zipcode: string
  }
}

export { InputFindCustomerDto, OutputFindCustomerDto }
