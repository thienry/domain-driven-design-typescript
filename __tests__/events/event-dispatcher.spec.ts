import { EventDispatcher } from '../../src/domain/@shared/events/event-dispatcher'
import { ProductCreatedEvent } from '../../src/domain/product/product-created.event'
import { SendEmailProductCreatedHandler } from '../../src/domain/product/handler/send-email-product-created.handler'

describe('Domain events unit tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailProductCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].at(0)).toMatchObject(eventHandler)
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailProductCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].at(0)).toMatchObject(eventHandler)

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].length).toBe(0)
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailProductCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].at(0)).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeUndefined()
  })

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailProductCreatedHandler()
    const spyOnEventhandler = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].at(0)).toMatchObject(eventHandler)

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      price: 10.0,
      description: 'Product description',
    })

    eventDispatcher.notify(productCreatedEvent)

    expect(spyOnEventhandler).toHaveBeenCalled()
  })
})
