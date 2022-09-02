import { IEvent } from './event.interface'

interface IEventHandler<T extends IEvent = IEvent> {
  handle(event: T): void
}

interface IEventHandlers {
  [eventName: string]: IEventHandler[]
}

export { IEventHandler, IEventHandlers }
