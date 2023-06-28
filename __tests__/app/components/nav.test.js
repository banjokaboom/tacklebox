import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Nav from '../../../app/components/nav'
import '@testing-library/jest-dom'

describe('Nav', () => {
  it('has all proper link text', () => {
    render(<Nav />)

    const homeLink = screen.getByText('Home')
    const oilPricesLink = screen.getByText('Oil Prices (MA)')
    const canIFishLink = screen.getByText('Can I Fish (MA)')
    const whatToFishLink = screen.getByText('What to Fish (Freshwater)')
    const whatToMakeLink = screen.getByText('What to Make for Dinner')

    expect(homeLink).toBeInTheDocument()
    expect(oilPricesLink).toBeInTheDocument()
    expect(canIFishLink).toBeInTheDocument()
    expect(whatToFishLink).toBeInTheDocument()
    expect(whatToMakeLink).toBeInTheDocument()
  })

  it('has all proper links', () => {
    render(<Nav />)

    const homeLink = screen.getByText('Home')
    const oilPricesLink = screen.getByText('Oil Prices (MA)')
    const canIFishLink = screen.getByText('Can I Fish (MA)')
    const whatToFishLink = screen.getByText('What to Fish (Freshwater)')
    const whatToMakeLink = screen.getByText('What to Make for Dinner')

    expect(homeLink.href).toMatch(/\//)
    expect(oilPricesLink.href).toMatch(/\/pages\/oil-prices/)
    expect(canIFishLink.href).toMatch(/\/pages\/can-i-fish/)
    expect(whatToFishLink.href).toMatch(/\/pages\/what-to-fish/)
    expect(whatToMakeLink.href).toMatch(/\/pages\/what-to-make/)
  })
})
