import { Sequelize } from 'sequelize-typescript'

import { FindProductUseCase } from './find.product.usecase'
import { Product } from '../../../domain/product/product.entity'
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model'
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository'

describe('Integration Test find product use case', () => {
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

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)

    const product = new Product('123', 'Product A', 29.99)
    await productRepository.create(product)

    const input = { id: product.id }
    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    }

    const productResult = await usecase.execute(input)

    expect(productResult).toEqual(output)
  })
})
