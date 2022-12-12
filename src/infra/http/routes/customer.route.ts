import express, { Request, Response } from 'express'

import { CustomerRepository } from '../../customer/repository/sequelize/customer.repository'
import { InputCreateCustomerDto } from '../../../usecase/customer/create/create.customer.dto'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase'

const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())

  try {
    const customerInputDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        city: req.body.address.city,
        number: req.body.address.number,
        street: req.body.address.street,
        zipcode: req.body.address.zipcode,
      },
    }

    const outputDto = await usecase.execute(customerInputDto)
    res.send(outputDto)
  } catch (error) {
    res.status(500).send(error)
  }
})

export { customerRoute }
