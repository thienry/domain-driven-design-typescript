import { Address } from '../../src/domain/entities/address.entity'
import { Customer } from '../../src/domain/entities/customer.entity'
import { EventDispatcher } from '../../src/domain/events/@shared/event-dispatcher'
import { CustomerCreatedEvent } from '../../src/domain/events/customer/customer-created.event'
import { SendFirstCustomerCreatedHandler } from '../../src/domain/events/customer/handler/send-first-customer-created.handler'
import { SendSecondCustomerCreatedHandler } from '../../src/domain/events/customer/handler/send-second-customer-created.handler'

describe('Change customer address event unit tests', () => {
  let eventName: string
  let eventDispatcher: EventDispatcher
  let firstEventHandler: SendFirstCustomerCreatedHandler
  let secondEventHandler: SendSecondCustomerCreatedHandler

  beforeEach(() => {
    eventName = 'CustomerCreatedEvent'
    eventDispatcher = new EventDispatcher()
    firstEventHandler = new SendFirstCustomerCreatedHandler()
    secondEventHandler = new SendSecondCustomerCreatedHandler()
  })

  it('should created a customer created event', () => {
    const customerCreatedEvent = new CustomerCreatedEvent(eventName)

    expect(customerCreatedEvent.eventData).toEqual(eventName)
    expect(customerCreatedEvent.dataTimeOccurred).toBeTruthy()
  })

  it('should register customer created event', () => {
    eventDispatcher.register(eventName, firstEventHandler)
    eventDispatcher.register(eventName, secondEventHandler)

    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined()
    expect(eventDispatcher.eventHandlers[eventName].length).toBe(2)
    expect(eventDispatcher.eventHandlers[eventName].at(0)).toMatchObject(firstEventHandler)
    expect(eventDispatcher.eventHandlers[eventName].at(1)).toMatchObject(secondEventHandler)
  })

  it('should unregister customer created event', () => {
    eventDispatcher.register(eventName, firstEventHandler)
    eventDispatcher.register(eventName, secondEventHandler)
    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined()

    eventDispatcher.unregister(eventName, firstEventHandler)
    eventDispatcher.unregister(eventName, secondEventHandler)

    expect(eventDispatcher.eventHandlers[eventName].length).toBe(0)
  })

  it('should notify all event handlers', () => {
    const spyOnFirstEventHandler = jest.spyOn(firstEventHandler, 'handle')
    const spyOnSecondEventHandler = jest.spyOn(secondEventHandler, 'handle')
    eventDispatcher.register(eventName, firstEventHandler)
    eventDispatcher.register(eventName, secondEventHandler)
    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined()

    const customer = new Customer('123', 'John Doe')
    const address = new Address('Rua 2', 171, 'City 2', '12345-678')
    customer.changeAddress(address)

    const customerCreatedEvent = new CustomerCreatedEvent(customer)
    eventDispatcher.notify(customerCreatedEvent)

    expect(spyOnFirstEventHandler).toHaveBeenCalledWith(customerCreatedEvent)
    expect(spyOnSecondEventHandler).toHaveBeenCalledWith(customerCreatedEvent)
  })
})
