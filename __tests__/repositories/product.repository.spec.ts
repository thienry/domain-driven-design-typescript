import { Sequelize } from 'sequelize-typescript'

import { Product } from '../../src/domain/product/product.entity'
import { ProductModel } from '../../src/infra/product/repository/sequelize/product.model'
import { ProductRepository } from '../../src/infra/product/repository/sequelize/product.repository'

describe('Product repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => await sequelize.close())

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)
    const newProduct = await ProductModel.findOne({ where: { id: '1' } })

    expect(newProduct).toBeDefined()
    expect(newProduct?.toJSON()).toEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)

    product.changeName('Product 2')
    product.changePrice(200)

    await productRepository.update(product)
    const updatedProduct = await ProductModel.findOne({ where: { id: '1' } })

    expect(updatedProduct).toBeDefined()
    expect(updatedProduct?.toJSON()).toEqual({
      id: '1',
      name: 'Product 2',
      price: 200,
    })
  })

  it('should delete a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)
    await productRepository.delete('1')
    const deletedProduct = await ProductModel.findOne({ where: { id: '1' } })

    expect(deletedProduct).toBeFalsy()
  })

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)
    const products = await productRepository.findAll()

    expect(products).toHaveLength(1)
    expect(products[0]).toEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
  })

  it('should find product by id', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)
    const productFound = await productRepository.findById('1')

    expect(productFound).toBeDefined()
    expect(productFound).toEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
  })
})
