import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import PoolCare from '@/app/home-maintenance/pool-care/page'
import '@testing-library/jest-dom'

describe('PoolCare', () => {
  it('renders a heading', () => {
    render(<PoolCare />)

    const heading = screen.getByRole('heading', {
      name: /Pool Care/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
