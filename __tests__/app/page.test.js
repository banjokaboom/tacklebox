import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Home from '@/app/page'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Home/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
