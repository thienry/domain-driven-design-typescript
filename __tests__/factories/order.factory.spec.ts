import { v4 as uuid } from 'uuid'

import { OrderFactory } from '../../src/domain/checkout/order.factory'

describe('Order factory unit tests', () => {
  let orderProps

  beforeEach(() => {
    orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          price: 100,
          quantity: 1,
          name: 'Product 1',
          productId: uuid(),
        },
      ],
    }
  })

  it('Should create an order', () => {
    const order = OrderFactory.create(orderProps)

    expect(order.items.length).toBe(1)
    expect(order.id).toEqual(orderProps.id)
    expect(order.customerId).toEqual(orderProps.customerId)
  })
})
