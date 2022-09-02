import { ProductCreatedEvent } from '../product-created.event'
import { IEventHandler } from '../../@shared/events/event-handler.interface'

class SendEmailProductCreatedHandler implements IEventHandler<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to... with data: ${JSON.stringify(event)}`)
  }
}

export { SendEmailProductCreatedHandler }
