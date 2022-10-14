import { Product } from '../../../domain/product/product.entity'
import { ProductFactory } from '../../../domain/product/product.factory'
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto'
import { IProductRepository } from '../../../domain/product/product.repository.interface'

class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create('a', input.name, input.price)
    await this.productRepository.create(product as Product)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}

export { CreateProductUseCase }
