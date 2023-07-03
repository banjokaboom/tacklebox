import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Changelog from '../../../../app/changelog/page'
import '@testing-library/jest-dom'

describe('Changelog', () => {
  it('renders a heading', () => {
    render(<Changelog />)

    const heading = screen.getByRole('heading', {
      name: /Changelog/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
