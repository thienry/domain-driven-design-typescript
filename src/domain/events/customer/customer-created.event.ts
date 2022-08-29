import { IEvent } from '../@shared/event.interface'
//import { ICustomerCreated } from './customer-created.interface'

class CustomerCreatedEvent implements IEvent {
  eventData: any
  dataTimeOccurred: Date

  constructor(eventData: any) {
    this.eventData = eventData
    this.dataTimeOccurred = new Date()
  }
}

export { CustomerCreatedEvent }
