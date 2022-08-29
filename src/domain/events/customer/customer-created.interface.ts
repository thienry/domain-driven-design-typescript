import { Address } from '../../entities/address.entity'

interface ICustomerCreated {
  id: string
  name: string
  address?: Address
  isActive: boolean
  rewardPoints: number
}

export { ICustomerCreated }
