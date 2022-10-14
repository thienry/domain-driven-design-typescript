import { ListProductsUseCase } from './list.product.usecase'
import { ProductFactory } from '../../../domain/product/product.factory'

const product1 = ProductFactory.create('a', 'Product A', 9.99)
const product2 = ProductFactory.create('b', 'Product B', 19.99)

const MockRepo = () => ({
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
})

describe('Unit test for listing products use case', () => {
  it('should list produts', async () => {
    const repo = MockRepo()
    const usecase = new ListProductsUseCase(repo)

    const output = await usecase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products.at(0).id).toBe(product1.id)
    expect(output.products.at(1).id).toBe(product2.id)
    expect(output.products.at(0).name).toBe(product1.name)
    expect(output.products.at(1).name).toBe(product2.name)
    expect(output.products.at(0).price).toBe(product1.price)
    expect(output.products.at(1).price).toBe(product2.price)
  })
})
