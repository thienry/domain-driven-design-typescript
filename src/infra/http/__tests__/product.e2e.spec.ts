import request from 'supertest'

import { app, sequelize } from '../express'

describe('E2E tests for product', () => {
  beforeEach(async () => sequelize.sync({ force: true }))

  afterAll(async () => sequelize.close())

  it('should create a product', async () => {
    const inputBody = {
      name: 'Product A',
      price: 1.99,
    }
    const response = await request(app).post('/products').send(inputBody)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(inputBody.name)
    expect(response.body.price).toBe(inputBody.price)
  })

  it('should not create a product', async () => {
    const response = await request(app).post('/products').send({ name: 'Product' })
    expect(response.status).toBe(500)
  })

  it('should list products', async () => {
    const inputBody1 = { name: 'Product A', price: 1.99 }
    const inputBody2 = { name: 'Product B', price: 9.99 }

    await request(app).post('/products').send(inputBody1)
    await request(app).post('/products').send(inputBody2)

    const listResponse = await request(app).get('/products').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products.length).toBe(2)

    const product1 = listResponse.body.products.at(0)
    expect(product1.name).toBe(inputBody1.name)
    expect(product1.price).toBe(inputBody1.price)

    const product2 = listResponse.body.products.at(1)
    expect(product2.name).toBe(inputBody2.name)
    expect(product2.price).toBe(inputBody2.price)
  })
})
