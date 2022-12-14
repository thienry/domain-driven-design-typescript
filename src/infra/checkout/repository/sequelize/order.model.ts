import {
  Model,
  Table,
  Column,
  HasMany,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript'

import { OrderItemModel } from './order-item.model'
import { CustomerModel } from '../../../customer/repository/sequelize/customer.model'

@Table({ tableName: 'orders', timestamps: false })
class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @Column({ allowNull: false })
  declare total: number

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]
}

export { OrderModel }
