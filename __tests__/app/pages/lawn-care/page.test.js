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
})
