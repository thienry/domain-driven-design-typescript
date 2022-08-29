import { CustomerCreatedEvent } from '../customer-created.event'
import { IEventHandler } from '../../@shared/event-handler.interface'

class SendFirstCustomerCreatedHandler implements IEventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('This is the first console.log from event: CustomerCreatedEvent')
  }
}

export { SendFirstCustomerCreatedHandler }
