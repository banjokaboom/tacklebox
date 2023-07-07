import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import TackleBySpecies from '@/app/fishing/tackle-by-species/page'
import '@testing-library/jest-dom'

describe('TackleBySpecies', () => {
  it('renders a heading', () => {
    render(<TackleBySpecies />)

    const heading = screen.getByRole('heading', {
      name: /Tackle by Species/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
