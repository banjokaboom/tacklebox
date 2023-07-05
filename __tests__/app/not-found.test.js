import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import NotFound from '@/app/not-found'
import '@testing-library/jest-dom'

describe('NotFound', () => {
  it('renders a heading', () => {
    render(<NotFound />)

    const heading = screen.getByRole('heading', {
      name: /404 Not Found/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
