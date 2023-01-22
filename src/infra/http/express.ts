import express from 'express'
import { Sequelize } from 'sequelize-typescript'

import { productRoute } from './routes/product.route'
import { customerRoute } from './routes/customer.route'
import { ProductModel } from '../product/repository/sequelize/product.model'
import { CustomerModel } from '../customer/repository/sequelize/customer.model'

const app = express()
app.use(express.json())
app.use('/products', productRoute)
app.use('/customers', customerRoute)

let sequelize: Sequelize

async function setupDb(): Promise<void> {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}

setupDb()

export { app, sequelize }
