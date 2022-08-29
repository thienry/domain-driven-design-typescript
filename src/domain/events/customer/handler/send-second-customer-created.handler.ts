import { CustomerCreatedEvent } from '../customer-created.event'
import { IEventHandler } from '../../@shared/event-handler.interface'

class SendSecondCustomerCreatedHandler implements IEventHandler<CustomerCreatedEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: CustomerCreatedEvent): void {
    console.log('This is the second console.log from event: CustomerCreatedEvent')
  }
}

export { SendSecondCustomerCreatedHandler }
