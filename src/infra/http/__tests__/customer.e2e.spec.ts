import request from 'supertest'

import { app, sequelize } from '../express'

describe('E2E tests for customer', () => {
  beforeEach(async () => sequelize.sync({ force: true }))

  afterAll(async () => sequelize.close())

  it('should create a customer', async () => {
    const inputBody = {
      name: 'John Doe',
      address: { street: 'Street', city: 'City', number: 1234, zipcode: '123456' },
    }
    const response = await request(app).post('/customers').send(inputBody)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(inputBody.name)
    expect(response.body.address.city).toBe(inputBody.address.city)
    expect(response.body.address.number).toBe(inputBody.address.number)
    expect(response.body.address.street).toBe(inputBody.address.street)
    expect(response.body.address.zipcode).toBe(inputBody.address.zipcode)
  })

  it('should not create a customer', async () => {
    const response = await request(app).post('/customers').send({ name: 'John Doe' })
    expect(response.status).toBe(500)
  })

  it('should not create a customer', async () => {
    const inputBody1 = {
      name: 'John Doe',
      address: { street: 'Street', city: 'City', number: 1234, zipcode: '123456' },
    }
    const inputBody2 = {
      name: 'Jane Doe',
      address: { street: 'Street2', city: 'City2', number: 1234, zipcode: '1234562' },
    }

    await request(app).post('/customers').send(inputBody1)
    await request(app).post('/customers').send(inputBody2)

    const listResponse = await request(app).get('/customers').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)

    const customer1 = listResponse.body.customers.at(0)
    expect(customer1.name).toBe(inputBody1.name)
    expect(customer1.address.city).toBe(inputBody1.address.city)
    expect(customer1.address.number).toBe(inputBody1.address.number)
    expect(customer1.address.street).toBe(inputBody1.address.street)
    expect(customer1.address.zipcode).toBe(inputBody1.address.zipcode)

    const customer2 = listResponse.body.customers.at(1)
    expect(customer2.name).toBe(inputBody2.name)
    expect(customer2.address.city).toBe(inputBody2.address.city)
    expect(customer2.address.number).toBe(inputBody2.address.number)
    expect(customer2.address.street).toBe(inputBody2.address.street)
    expect(customer2.address.zipcode).toBe(inputBody2.address.zipcode)
  })
})
