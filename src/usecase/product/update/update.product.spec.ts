import { Sequelize } from 'sequelize-typescript'

import { UpdateProductUseCase } from './update.product.usecase'
import { Product } from '../../../domain/product/product.entity'
import { ProductFactory } from '../../../domain/product/product.factory'
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model'
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository'

describe('Integration Test update product use case', () => {
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

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new UpdateProductUseCase(productRepository)

    const product = ProductFactory.create('a', 'Product A', 29.99)
    await productRepository.create(product as Product)

    const input = { id: product.id, name: 'Product B', price: 19.99 }
    const output = { id: product.id, name: input.name, price: input.price }

    const updatedProduct = await usecase.execute(input)

    expect(updatedProduct.id).toBeDefined()
    expect(updatedProduct.name).toBe(output.name)
    expect(updatedProduct.price).toBe(output.price)
  })
})
