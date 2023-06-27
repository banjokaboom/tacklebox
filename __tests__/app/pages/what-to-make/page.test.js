import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import WhatToMake from '../../../../app/pages/what-to-make/page'
import '@testing-library/jest-dom'

describe('WhatToMake', () => {
  it('renders a heading', async () => {
    act(() => render(<WhatToMake />))

    const heading = await screen.findByText(/What to Make/i)

    expect(heading).toBeInTheDocument()
  })
})
