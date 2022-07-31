import { Order } from './entities/order.entity'
import { Address } from './entities/address.entity'
import { Customer } from './entities/customer.entity'
import { OrderItem } from './entities/order-item.entity'

const customer = new Customer('123', 'John')
const address = new Address('Street', 1, 'City', 'Zipcode')
customer.changeAddress(address)
customer.activate()

const item1 = new OrderItem('1', 'Item 1', 10)
const item2 = new OrderItem('2', 'Item 2', 15)
const order = new Order('1', customer.getId(), [item1, item2])

console.log(JSON.stringify(order.toString(), null, 2))
