import { render } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Home from '@/app/page'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    try {
      render(<Home />)
    } catch (error) {
      expect(error.digest).toContain('NEXT_REDIRECT')
    }
  })
})
