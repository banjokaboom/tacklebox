import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Fishing from '@/app/fishing/page'
import '@testing-library/jest-dom'

describe('Fishing', () => {
  it('renders a heading', () => {
    render(<Fishing />)

    const heading = screen.getByRole('heading', {
      name: /Fishing/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
