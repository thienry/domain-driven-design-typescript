interface InputUpdateProductDto {
  id: string
  name: string
  type?: string
  price: number
}

interface OutputUpdateProductDto {
  id: string
  name: string
  price: number
}

export { InputUpdateProductDto, OutputUpdateProductDto }
