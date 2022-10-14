import { CreateProductUseCase } from './create.product.usecase'

const input = { name: 'Product A', price: 29.9 }

const MockRepo = () => ({
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
})

describe('Unit tests create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepo()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const output = await createProductUseCase.execute(input)

    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.price).toBe(input.price)
  })

  it('should throws when name is missing', async () => {
    const productRepo = MockRepo()
    const createProductUseCase = new CreateProductUseCase(productRepo)

    input.name = ''

    expect(createProductUseCase.execute(input)).rejects.toThrowError()
  })

  it('should throws when price is less than zero', async () => {
    const productRepo = MockRepo()
    const createProductUseCase = new CreateProductUseCase(productRepo)

    input.price = -1

    expect(createProductUseCase.execute(input)).rejects.toThrowError()
  })
})
