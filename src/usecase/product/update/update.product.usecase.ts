import { InputUpdateProductDto, OutputUpdateProductDto } from './update.product.dto'
import { IProductRepository } from '../../../domain/product/product.repository.interface'
import { Product } from '../../../domain/product/product.entity'

class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.findById(input.id)
    product.changeName(input.name)
    product.changePrice(input.price)

    await this.productRepository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}

export { UpdateProductUseCase }
