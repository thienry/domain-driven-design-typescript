import { Product } from '../../src/domain/product/product.entity'

describe('Product unit tests', () => {
  it('Should throws an error when ID is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrowError('product: ID is required!')
  })

  it('Should throws an error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrowError('product: Name is required!')
  })

  it('Should throws an error when ID and name are empties', () => {
    expect(() => new Product('', '', 100)).toThrowError(
      'product: ID is required!,product: Name is required!'
    )
  })

  it('Should throws an error when price is negative', () => {
    expect(() => new Product('1', 'Product 1', -1)).toThrowError(
      'product: Price must be greater than 0'
    )
  })

  it('Should not throws an error when all properties are valid', () => {
    expect(() => new Product('1', 'Product 1', 100)).not.toThrowError()
  })

  it('Should change the product name', () => {
    const product = new Product('1', 'Product 1', 100)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  it('Should change product price', () => {
    const product = new Product('1', 'Product 1', 100)
    product.changePrice(200)
    expect(product.price).toBe(200)
  })
})
