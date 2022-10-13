type Customer = {
  id: string
  name: string
  address: {
    city: string
    number: number
    street: string
    zipcode: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InputListCustomerDto {}

interface OutputListCustomerDto {
  customers: Customer[]
}

export { InputListCustomerDto, OutputListCustomerDto }
