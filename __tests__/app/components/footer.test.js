import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Footer from '../../../app/components/footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('has all proper link text', () => {
    render(<Footer />)

    const homeLink = screen.getByText('Home')
    const oilPricesLink = screen.getByText('Heating Oil Prices (MA)')
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
    render(<Footer />)

    const homeLink = screen.getByText('Home')
    const oilPricesLink = screen.getByText('Heating Oil Prices (MA)')
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