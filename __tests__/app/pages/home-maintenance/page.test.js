import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import HomeMaintenance from '@/app/home-maintenance/page'
import '@testing-library/jest-dom'

describe('HomeMaintenance', () => {
  it('renders a heading', () => {
    render(<HomeMaintenance />)

    const heading = screen.getByRole('heading', {
      name: /Home Maintenance/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
