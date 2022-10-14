type Product = {
  id: string
  name: string
  price: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InputListProductDto {}

interface OutputListProductDto {
  products: Product[]
}

export { InputListProductDto, OutputListProductDto }
