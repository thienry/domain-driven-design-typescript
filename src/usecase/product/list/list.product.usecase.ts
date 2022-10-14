import { Product } from '../../../domain/product/product.entity'
import { InputListProductDto, OutputListProductDto } from './list.product.dto'
import { IProductRepository } from '../../../domain/product/product.repository.interface'

class ListProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(_: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    return OutputMapper.toOutput(products)
  }
}

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    }
  }
}

export { ListProductsUseCase }
