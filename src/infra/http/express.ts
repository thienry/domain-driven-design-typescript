import express from 'express'
import { Sequelize } from 'sequelize-typescript'

import { CustomerModel } from '../customer/repository/sequelize/customer.model'

const app = express()
app.use(express.json())

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
