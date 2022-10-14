import { InputFindProductDto, OutputFindProductDto } from './find.product.dto'
import { IProductRepository } from '../../../domain/product/product.repository.interface'

class FindProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.findById(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}

export { FindProductUseCase }
