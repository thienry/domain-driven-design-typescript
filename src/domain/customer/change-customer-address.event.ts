import { IEvent } from '../@shared/events/event.interface'
// import { ICustomerCreated } from './customer-created.interface'

class ChangeCustomerAddressEvent implements IEvent {
  eventData: any
  dataTimeOccurred: Date

  constructor(eventData: any) {
    this.eventData = eventData
    this.dataTimeOccurred = new Date()
  }
}

export { ChangeCustomerAddressEvent }
