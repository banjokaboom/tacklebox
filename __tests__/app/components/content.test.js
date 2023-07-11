import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Content from '@/app/components/content'
import '@testing-library/jest-dom'

describe('Content', () => {
  it('renders component', () => {
    render(<Content title="Test Title" content="Test Content" />)

    const title = screen.getByText('Test Title')
    const content = screen.getByText('Test Content')

    expect(title).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })

  it('expands when title is clicked', () => {
    render(<Content title="Test Title" content="Test Content" />)

    const button = screen.getByText('Test Title')
    const content = screen.getByText('Test Content')

    expect(button).toBeInTheDocument()
    expect(content.parentNode.className.includes('h-0')).toBeTruthy()

    fireEvent.click(button)

    expect(content.parentNode.className.includes('h-0')).toBeFalsy()
  })

  it('expands when subtitle is clicked when there is no title', () => {
    render(<Content subtitle="Test Title" content="Test Content" />)

    const button = screen.getByText('Test Title')
    const content = screen.getByText('Test Content')

    expect(button).toBeInTheDocument()
    expect(content.parentNode.className.includes('h-0')).toBeTruthy()

    fireEvent.click(button)

    expect(content.parentNode.className.includes('h-0')).toBeFalsy()
  })
})
