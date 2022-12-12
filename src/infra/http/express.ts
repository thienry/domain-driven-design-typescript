import express from 'express'
import { Sequelize } from 'sequelize-typescript'

import { customerRoute } from './routes/customer.route'
import { CustomerModel } from '../customer/repository/sequelize/customer.model'

const app = express()
app.use(express.json())
app.use('/customers', customerRoute)

let sequelize: Sequelize

async function setupDb(): Promise<void> {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([CustomerModel])
  await sequelize.sync()
}

setupDb()

export { app, sequelize }
