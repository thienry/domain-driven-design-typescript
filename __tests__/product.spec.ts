import { Product } from '../src/entities/product.entity'

describe('Product unit tests', () => {
  it('Should throws an error when ID is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrowError('ID is required')
  })

  it('Should throws an error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrowError('Name is required')
  })

  it('Should throws an error when price is negative', () => {
    expect(() => new Product('1', 'Product 1', -1)).toThrowError('Price must be greater than 0')
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
