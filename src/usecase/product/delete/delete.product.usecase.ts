import { InputDeleteProductDto, OutputDeleteProductDto } from './delete.product.dto'
import { IProductRepository } from '../../../domain/product/product.repository.interface'

class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: InputDeleteProductDto): Promise<OutputDeleteProductDto> {
    const product = await this.productRepository.findById(input.id)
    await this.productRepository.delete(product.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}

export { DeleteProductUseCase }
