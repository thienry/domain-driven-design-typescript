import { Sequelize } from 'sequelize-typescript'

import { CreateProductUseCase } from './create.product.usecase'
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model'
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository'
import { ProductFactory } from '../../../domain/product/product.factory'

describe('Integration Test create product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      logging: false,
      dialect: 'sqlite',
      storage: ':memory:',
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => await sequelize.close())

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const product = ProductFactory.create('a', 'Product A', 29.99)

    const input = { name: product.name, price: product.price }
    const output = { id: product.id, name: product.name, price: product.price }

    const createdProduct = await usecase.execute(input)

    expect(createdProduct.id).toBeDefined()
    expect(createdProduct.name).toBe(output.name)
    expect(createdProduct.price).toBe(output.price)
  })
})
