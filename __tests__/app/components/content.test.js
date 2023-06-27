import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Content from '../../../app/components/content'
import '@testing-library/jest-dom'

describe('Content', () => {
  it('renders component', () => {
    render(<Content title="Test Title" content="Test Content" />)

    const title = screen.getByText('Test Title')
    const content = screen.getByText('Test Content')

    expect(title).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })
})
