import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import MessageData from '@/app/classes/MessageData'

describe('MessageData', () => {
  it('initializes with empty values', () => {
    const messageData = new MessageData()

    expect(messageData.message).toBe('')
    expect(messageData.severity).toBe('')
  })
})
