import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Header from '../../../app/components/header'
import '@testing-library/jest-dom'

describe('Header', () => {
  it('renders app name', () => {
    render(<Header />)

    const appName = screen.getByText('Tacklebox')

    expect(appName).toBeInTheDocument()
  })

  it('has home link', () => {
    render(<Header />)

    const appName = screen.getByText('Tacklebox')

    expect(appName.href).toMatch(/\//)
  })
})
