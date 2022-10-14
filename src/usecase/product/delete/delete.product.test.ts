import { DeleteProductUseCase } from './delete.product.usecase'
import { ProductFactory } from '../../../domain/product/product.factory'

const product = ProductFactory.create('a', 'Product A', 19.99)

const input = { id: product.id }

const MockRepo = () => ({
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn().mockReturnValue(Promise.resolve(product)),
})

describe('Unit test for product delete use case', () => {
  it('should delete a product', async () => {
    const productRepo = MockRepo()
    const deleteProductUseCase = new DeleteProductUseCase(productRepo)

    const output = await deleteProductUseCase.execute(input)

    expect(output.id).toBe(input.id)
  })
})
