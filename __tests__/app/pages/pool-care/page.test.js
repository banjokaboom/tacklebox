import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import PoolCare from '@/app/home-maintenance/pool-care/page'
import '@testing-library/jest-dom'

describe('PoolCare', () => {
  it('renders a heading', () => {
    render(<PoolCare />)

    const heading = screen.getByRole('heading', {
      name: /Pool Care/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders recommendations in spring', () => {
    let date = new Date()
    date.setMonth('4')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    render(<PoolCare />)

    const heading = screen.getByText('What to do this month')

    expect(heading).toBeInTheDocument()

    // eslint-disable-next-line
    jest.useRealTimers()
  })

  it('renders recommendations in early summer', () => {
    let date = new Date()
    date.setMonth('5')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    render(<PoolCare />)

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

    render(<PoolCare />)

    const heading = screen.getByText('What to do this month')

    expect(heading).toBeInTheDocument()

    // eslint-disable-next-line
    jest.useRealTimers()
  })

  it('renders recommendations in late summer', () => {
    let date = new Date()
    date.setMonth('8')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    render(<PoolCare />)

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

    render(<PoolCare />)

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

    render(<PoolCare />)

    const heading = screen.getByText('What to do this month')

    expect(heading).toBeInTheDocument()

    // eslint-disable-next-line
    jest.useRealTimers()
  })
})
