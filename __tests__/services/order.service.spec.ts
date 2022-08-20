import { Order } from '../../src/domain/entities/order.entity'
import { Customer } from '../../src/domain/entities/customer.entity'
import { OrderService } from '../../src/domain/services/order.service'
import { OrderItem } from '../../src/domain/entities/order-item.entity'

describe('Order service unit tests', () => {
  it('should get total of all orders', () => {
    const orderItem1 = new OrderItem('1', 'Product 1', 10, 1, '10')
    const orderItem2 = new OrderItem('2', 'Product 2', 20, 2, '20')
    const order1 = new Order('o1', 100, 'c1', [orderItem1])
    const order2 = new Order('o2', 100, 'c1', [orderItem2])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(50)
  })

  it('should place an order', () => {
    const customer = new Customer('c1', 'John Doe')
    const orderItem1 = new OrderItem('1', 'Product 1', 10, 1, '10')

    const placedOrder = OrderService.placeOrder(customer, [orderItem1])

    expect(customer.rewardPoints).toBe(5)
    expect(placedOrder.total()).toBe(10)
  })

  it('should add reward points', () => {
    const customer = new Customer('c1', 'John Doe')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})
