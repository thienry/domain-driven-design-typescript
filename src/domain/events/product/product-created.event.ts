import { IEvent } from '../@shared/event.interface'
import { IProductCreated } from './product-created.interface'

class ProductCreatedEvent implements IEvent {
  eventData: IProductCreated
  dataTimeOccurred: Date

  constructor(eventData: IProductCreated) {
    this.eventData = eventData
    this.dataTimeOccurred = new Date()
  }
}

export { ProductCreatedEvent }
