import { Product } from './product.entity'
import { IRepository } from '../@shared/repository/repository.interface'

type IProductRepository = IRepository<Product>

export { IProductRepository }
