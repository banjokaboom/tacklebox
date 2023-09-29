import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Footer from '@/app/components/footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('has all proper link text', () => {
    render(<Footer />)

    const fishingLink = screen.getByText('Fishing')

    expect(fishingLink).toBeInTheDocument()
  })
})
