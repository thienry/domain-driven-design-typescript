import { Address } from '../../src/domain/customer/address.entity'
import { Customer } from '../../src/domain/customer/customer.entity'
import { EventDispatcher } from '../../src/domain/@shared/events/event-dispatcher'
import { ChangeCustomerAddressEvent } from '../../src/domain/customer/change-customer-address.event'
import { SendChangeCustomerAddressHandler } from '../../src/domain/customer/handler/send-customer-created-change-address.handler'

describe('Change customer address event unit tests', () => {
  let customerAddress: Address
  let eventName: string
  let customerAddressUpdated: Customer
  let eventDispatcher: EventDispatcher
  let eventHandler: SendChangeCustomerAddressHandler

  beforeEach(() => {
    eventName = 'ChangeCustomerAddressEvent'
    eventDispatcher = new EventDispatcher()
    eventHandler = new SendChangeCustomerAddressHandler()
    customerAddress = new Address('Rua 1', 191, 'City', '12345-678')
    customerAddressUpdated = new Customer('123', 'John Doe', customerAddress)
  })

  it('should created a change customer address event', () => {
    const customerChangeAddressEvent = new ChangeCustomerAddressEvent(eventName)

    expect(customerChangeAddressEvent.eventData).toEqual(eventName)
    expect(customerChangeAddressEvent.dataTimeOccurred).toBeTruthy()
  })

  it('should register change customer address event', () => {
    eventDispatcher.register(eventName, eventHandler)

    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined()
    expect(eventDispatcher.eventHandlers[eventName].length).toBe(1)
    expect(eventDispatcher.eventHandlers[eventName].at(0)).toMatchObject(eventHandler)
  })

  it('should unregister change customer address event', () => {
    eventDispatcher.register(eventName, eventHandler)
    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined()

    eventDispatcher.unregister(eventName, eventHandler)

    expect(eventDispatcher.eventHandlers[eventName].length).toBe(0)
  })

  it('should notify all event handlers', () => {
    const spyOnEventHandler = jest.spyOn(eventHandler, 'handle')
    eventDispatcher.register(eventName, eventHandler)
    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined()

    const newAddress = new Address('Rua 2', 171, 'City 2', '12345-678')
    customerAddressUpdated.changeAddress(newAddress)

    const customerChangeAddressEvent = new ChangeCustomerAddressEvent(customerAddressUpdated)
    eventDispatcher.notify(customerChangeAddressEvent)

    expect(spyOnEventHandler).toHaveBeenCalledWith(customerChangeAddressEvent)
  })
})
