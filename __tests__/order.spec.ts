import { Order } from '../src/entities/order.entity'
import { OrderItem } from '../src/entities/order-item.entity'

describe('Order unit tests', () => {
  it('Should throws an error when ID is empty', () => {
    expect(() => new Order('', 0, '123')).toThrowError('Order ID is required')
  })

  it('Should throws an error when customer ID is empty', () => {
    expect(() => new Order('123', 0, '')).toThrowError('Customer ID is required')
  })

  it('Should throws an error when items is empty', () => {
    expect(() => new Order('123', 0, '123', [])).toThrowError('Order must have at least one item')
  })

  it('Should calculate total', () => {
    const item1 = new OrderItem('123', '123', 10)
    const item2 = new OrderItem('456', '456', 15)
    const order = new Order('123', 0, '123', [item1, item2])

    const total = order.total()

    expect(total).toBe(25)
  })
})
