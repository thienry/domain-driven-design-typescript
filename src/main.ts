import { Order } from './domain/checkout/order.entity'
import { Address } from './domain/customer/address.entity'
import { Customer } from './domain/customer/customer.entity'
import { OrderItem } from './domain/checkout/order-item.entity'

const customer = new Customer('123', 'John')
const address = new Address('Street', 1, 'City', 'Zipcode')
customer.changeAddress(address)
customer.activate()

const item1 = new OrderItem('123', 'Item 1', 10, 2, '123')
const item2 = new OrderItem('456', 'Item 2', 30, 2, '456')
const order = new Order('123', customer.id, [item1, item2])

console.log(JSON.stringify(order.toString(), null, 2))
