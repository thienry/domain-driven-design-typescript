import request from 'supertest'

import { app, sequelize } from '../express'

describe('E2E tests for customer', () => {
  beforeEach(async () => sequelize.sync({ force: true }))

  afterEach(async () => sequelize.close())

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
})
