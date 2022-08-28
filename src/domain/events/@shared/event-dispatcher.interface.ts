import { IEvent } from './event.interface'
import { IEventHandler } from './event-handler.interface'

interface IEventDispatcher {
  unregisterAll(): void
  notify(event: IEvent): void
  register(eventName: string, eventHandler: IEventHandler): void
  unregister(eventName: string, eventHandler: IEventHandler): void
}

export { IEventDispatcher }
