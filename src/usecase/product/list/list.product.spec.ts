import { Sequelize } from 'sequelize-typescript'

import { ListProductsUseCase } from './list.product.usecase'
import { Product } from '../../../domain/product/product.entity'
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model'
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository'

describe('Integration Test list products use case', () => {
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

  it('should list products', async () => {
    const productRepository = new ProductRepository()
    const usecase = new ListProductsUseCase(productRepository)

    const product1 = new Product('123', 'Product A', 29.99)
    const product2 = new Product('456', 'Product B', 9.99)
    await productRepository.create(product1)
    await productRepository.create(product2)

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
