import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Personal from '@/app/personal/page'
import '@testing-library/jest-dom'

describe('Personal', () => {
  it('renders a heading', () => {
    render(<Personal />)

    const heading = screen.getByRole('heading', {
      name: /Personal/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
