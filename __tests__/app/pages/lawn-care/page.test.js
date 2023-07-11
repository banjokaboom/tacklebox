import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import LawnCare from '@/app/home-maintenance/lawn-care/page'
import '@testing-library/jest-dom'

describe('LawnCare', () => {
  it('renders a heading', () => {
    render(<LawnCare />)

    const heading = screen.getByRole('heading', {
      name: /Lawn Care/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders recommendations in spring', () => {
    let date = new Date()
    date.setMonth('4')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    render(<LawnCare />)

    const heading = screen.getByText('What to do this month')

    expect(heading).toBeInTheDocument()

    // eslint-disable-next-line
    jest.useRealTimers()
  })

  it('renders recommendations in summer', () => {
    let date = new Date()
    date.setMonth('7')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    render(<LawnCare />)

    const heading = screen.getByText('What to do this month')

    expect(heading).toBeInTheDocument()

    // eslint-disable-next-line
    jest.useRealTimers()
  })

  it('renders recommendations in fall', () => {
    let date = new Date()
    date.setMonth('10')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    render(<LawnCare />)

    const heading = screen.getByText('What to do this month')

    expect(heading).toBeInTheDocument()

    // eslint-disable-next-line
    jest.useRealTimers()
  })

  it('renders recommendations in winter', () => {
    let date = new Date()
    date.setMonth('0')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    render(<LawnCare />)

    const heading = screen.getByText('What to do this month')

    expect(heading).toBeInTheDocument()

    // eslint-disable-next-line
    jest.useRealTimers()
  })
})
