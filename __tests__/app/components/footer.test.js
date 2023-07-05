import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Footer from '@/app/components/footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('has all proper link text', () => {
    render(<Footer />)

    const homeLink = screen.getByText('Home')
    const oilPricesLink = screen.getByText('Heating Oil Prices (MA)')
    const canIFishLink = screen.getByText('Can I Fish (MA)')
    const whatToFishLink = screen.getByText('What to Fish (Freshwater)')
    const personalLink = screen.getByText('Personal')

    expect(homeLink).toBeInTheDocument()
    expect(oilPricesLink).toBeInTheDocument()
    expect(canIFishLink).toBeInTheDocument()
    expect(whatToFishLink).toBeInTheDocument()
    expect(personalLink).toBeInTheDocument()
  })

  it('has all proper links', () => {
    render(<Footer />)

    const homeLink = screen.getByText('Home')
    const oilPricesLink = screen.getByText('Heating Oil Prices (MA)')
    const canIFishLink = screen.getByText('Can I Fish (MA)')
    const whatToFishLink = screen.getByText('What to Fish (Freshwater)')
    const personalLink = screen.getByText('Personal')

    expect(homeLink.href).toMatch(/\//)
    expect(oilPricesLink.href).toMatch(/\/oil-prices/)
    expect(canIFishLink.href).toMatch(/\/can-i-fish/)
    expect(whatToFishLink.href).toMatch(/\/what-to-fish/)
    expect(personalLink.href).toMatch(/\/personal/)
  })
})
