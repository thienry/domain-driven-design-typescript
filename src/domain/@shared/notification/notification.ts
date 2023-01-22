export interface NotificationErrorProps {
  message: string
  context: string
}

export class Notification {
  private _errors: NotificationErrorProps[] = []

  get errors(): NotificationErrorProps[] {
    return this._errors
  }

  addError(error: NotificationErrorProps): void {
    this._errors.push(error)
  }

  hasErrors(): boolean {
    return !!this._errors.length
  }

  messages(context?: string): string {
    let message = ''
    for (const error of this._errors) {
      if (!context || error.context === context) {
        message += `${error.context}: ${error.message},`
      }
    }

    return message
  }
}
