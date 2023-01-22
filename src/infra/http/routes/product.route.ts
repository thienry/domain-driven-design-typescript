import express, { Request, Response } from 'express'

import { ListProductsUseCase } from '../../../usecase/product/list/list.product.usecase'
import { ProductRepository } from '../../product/repository/sequelize/product.repository'
import { InputCreateProductDto } from '../../../usecase/product/create/create.product.dto'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'

const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())

  try {
    const productInputDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
    }

    const outputDto = await usecase.execute(productInputDto)
    res.send(outputDto)
  } catch (error) {
    res.status(500).send(error)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductsUseCase(new ProductRepository())

  try {
    const outputDto = await usecase.execute({})
    res.send(outputDto)
  } catch (error) {
    res.status(500).send(error)
  }
})

export { productRoute }
