import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Footer from '@/app/components/footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('has all proper link text', () => {
    render(<Footer />)

    const homeLink = screen.getByText('Home')
    const homeMaintenanceLink = screen.getByText('Home Maintenance')
    const fishingLink = screen.getByText('Fishing')
    const personalLink = screen.getByText('Personal')

    expect(homeLink).toBeInTheDocument()
    expect(homeMaintenanceLink).toBeInTheDocument()
    expect(fishingLink).toBeInTheDocument()
    expect(personalLink).toBeInTheDocument()
  })
})
