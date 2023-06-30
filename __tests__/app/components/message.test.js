import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Message from '../../../app/components/message'
import '@testing-library/jest-dom'

describe('Message', () => {
  it('renders component with success', () => {
    render(<Message message="Success Message" severity="success" />)

    const message = screen.getByText('Success Message')

    expect(message).toBeInTheDocument()
    expect(message.className.includes('bg-green-400')).toBeTruthy()
  })

  it('renders component with alert', () => {
    render(<Message message="Alert Message" severity="alert" />)

    const message = screen.getByText('Alert Message')

    expect(message).toBeInTheDocument()
    expect(message.className.includes('bg-yellow-400')).toBeTruthy()
  })

  it('renders component with error', () => {
    render(<Message message="Error Message" severity="error" />)

    const message = screen.getByText('Error Message')

    expect(message).toBeInTheDocument()
    expect(message.className.includes('bg-red-400')).toBeTruthy()
  })

  it('renders component with invalid severity with no background', () => {
    render(<Message message="Basic Message" severity="basic" />)

    const message = screen.getByText('Basic Message')

    expect(message).toBeInTheDocument()
    expect(message.className.includes('bg-green-400')).toBeFalsy()
    expect(message.className.includes('bg-yellow-400')).toBeFalsy()
    expect(message.className.includes('bg-red-400')).toBeFalsy()
  })
})
