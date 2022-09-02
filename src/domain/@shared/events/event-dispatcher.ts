import { IEvent } from './event.interface'
import { IEventDispatcher } from './event-dispatcher.interface'
import { IEventHandler, IEventHandlers } from './event-handler.interface'

class EventDispatcher implements IEventDispatcher {
  private _eventHandlers: IEventHandlers = {}

  get eventHandlers(): IEventHandlers {
    return this._eventHandlers
  }

  notify(event: IEvent): void {
    const eventName = event.constructor.name
    if (this.eventHandlers[eventName]) {
      for (const eventHandler of this.eventHandlers[eventName]) {
        eventHandler.handle(event)
      }
    }
  }

  register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
        (item) => item !== eventHandler
      )
    }
  }

  unregisterAll(): void {
    this._eventHandlers = {}
  }
}

export { EventDispatcher }
