import { UpdateProductUseCase } from './update.product.usecase'
import { ProductFactory } from '../../../domain/product/product.factory'

const product = ProductFactory.create('a', 'Product A', 19.99)

const input = {
  id: product.id,
  name: 'Product B',
  price: 29.99,
}

const MockRepo = () => ({
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn().mockReturnValue(Promise.resolve(product)),
})

describe('Unit test for product update use case', () => {
  it('should update a product', async () => {
    const productRepo = MockRepo()
    const updateProductUseCase = new UpdateProductUseCase(productRepo)

    const output = await updateProductUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
