import { Product } from '../entities/product.entity'
import { IRepository } from './repository.interface'

type IProductRepository = IRepository<Product>

export { IProductRepository }
