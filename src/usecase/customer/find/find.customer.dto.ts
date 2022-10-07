interface InputFindCustomerDto {
  id: string
}

interface OutputFindCustomerDto {
  id: string
  name: string
  address: {
    zip: string
    city: string
    number: number
    street: string
  }
}

export { InputFindCustomerDto, OutputFindCustomerDto }
