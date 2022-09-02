import { Order } from './order.entity'
import { IRepository } from '../@shared/repository/repository.interface'

type IOrderRepository = IRepository<Order>

export { IOrderRepository }
