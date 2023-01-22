import { Notification } from './notification'

describe('Unit test for Notifications', () => {
  it('should create an errors', () => {
    const notification = new Notification()

    const error = { message: 'error message', context: 'context' }
    notification.addError(error)
    expect(notification.messages('context')).toBe('context: error message,')

    const error2 = { message: 'error message 2', context: 'context' }
    notification.addError(error2)
    expect(notification.messages('context')).toBe(
      'context: error message,context: error message 2,'
    )

    const error3 = { message: 'error message 3', context: 'context2' }
    notification.addError(error3)
    expect(notification.messages('context')).toBe(
      'context: error message,context: error message 2,'
    )

    expect(notification.messages()).toBe(
      'context: error message,context: error message 2,context2: error message 3,'
    )
  })

  it('should check if a notification has at least 1 error', () => {
    const notification = new Notification()
    const error = { message: 'error message', context: 'context' }
    notification.addError(error)
    expect(notification.hasErrors()).toBe(true)
  })

  it('should get all errors props', () => {
    const notification = new Notification()
    const error = { message: 'error message', context: 'context' }
    notification.addError(error)
    expect(notification.errors).toEqual([error])
  })
})
