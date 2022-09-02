import { CustomerCreatedEvent } from '../customer-created.event'
import { IEventHandler } from '../../@shared/events/event-handler.interface'
import { ChangeCustomerAddressEvent } from '../change-customer-address.event'

class SendChangeCustomerAddressHandler implements IEventHandler<ChangeCustomerAddressEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log(`Client address: ${event.eventData.id}, ${event.eventData.name}`)
    console.log(`Updated to: ${event.eventData.address.toString()}`)
  }
}

export { SendChangeCustomerAddressHandler }
