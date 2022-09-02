import { IOrderItem } from './order-item.interface'

interface IOrder {
  id: string
  customerId: string
  items: IOrderItem[]
}

export { IOrder }
