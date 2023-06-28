import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import About from '../../../../app/pages/about/page'
import '@testing-library/jest-dom'

describe('About', () => {
  it('renders a heading', () => {
    render(<About />)

    const heading = screen.getByRole('heading', {
      name: /About Tacklebox/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
