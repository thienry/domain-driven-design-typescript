import { FindProductUseCase } from './find.product.usecase'
import { Product } from '../../../domain/product/product.entity'

const product = new Product('123', 'Product A', 29.99)

const MockRepo = () => ({
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn().mockReturnValue(Promise.resolve(product)),
})

describe('Unit tests find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepo()
    const usecase = new FindProductUseCase(productRepository)

    const input = { id: product.id }
    const output = { id: product.id, name: product.name, price: product.price }

    const customerResult = await usecase.execute(input)

    expect(customerResult).toEqual(output)
  })

  it('should thows when a product not found', async () => {
    const productRepository = MockRepo()
    productRepository.findById.mockImplementation(() => {
      throw new Error()
    })
    const usecase = new FindProductUseCase(productRepository)
    const input = { id: '123' }

    expect(async () => await usecase.execute(input)).rejects.toThrowError()
  })
})
