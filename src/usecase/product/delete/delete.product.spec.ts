import { Sequelize } from 'sequelize-typescript'

import { DeleteProductUseCase } from './delete.product.usecase'
import { Product } from '../../../domain/product/product.entity'
import { ProductFactory } from '../../../domain/product/product.factory'
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model'
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository'

describe('Integration Test delete product use case', () => {
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

  it('should delete a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new DeleteProductUseCase(productRepository)

    const product = ProductFactory.create('a', 'Product A', 29.99)
    await productRepository.create(product as Product)

    const input = { id: product.id }
    const output = { id: product.id, name: product.name, price: product.price }

    const deletedProduct = await usecase.execute(input)
    const productResult = await productRepository.findById(input.id)

    expect(productResult).toBeUndefined()
    expect(deletedProduct.id).toBeDefined()
    expect(deletedProduct.name).toBe(output.name)
    expect(deletedProduct.price).toBe(output.price)
  })
})
