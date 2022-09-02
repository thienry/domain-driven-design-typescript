import { ProductFactory } from '../../src/domain/product/product.factory'

describe('Product factory unit tests', () => {
  it('Should create product type a', () => {
    const productA = ProductFactory.create('a', 'Product A', 10)

    expect(productA.id).toBeDefined()
    expect(productA.name).toBe('Product A')
    expect(productA.price).toBe(10)
    expect(productA.constructor.name).toBe('Product')
  })

  it('Should create product type b', () => {
    const productA = ProductFactory.create('b', 'Product B', 20)

    expect(productA.id).toBeDefined()
    expect(productA.name).toBe('Product B')
    expect(productA.price).toBe(40)
    expect(productA.constructor.name).toBe('ProductB')
  })

  it('Should throw an error when product type is unsupported', () => {
    expect(() => ProductFactory.create('c', 'Product C', 30)).toThrowError(
      'Product type unsupported!'
    )
  })
})
