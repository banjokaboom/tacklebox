import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Menu from '@/app/components/menu'
import '@testing-library/jest-dom'

describe('Menu', () => {
  it('has all proper link text', () => {
    render(<Menu />)

    const fishingLink = screen.getByText('Fishing')
    const aboutLink = screen.getByText('About')
    const changelogLink = screen.getByText('Changelog')

    expect(fishingLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(changelogLink).toBeInTheDocument()
  })

  it('is h-0 when menu not clicked', () => {
    render(<Menu />)

    const fishingLink = screen.getByText('Fishing')
    const aboutLink = screen.getByText('About')
    const changelogLink = screen.getByText('Changelog')

    expect(fishingLink.parentNode.className.includes('h-0')).toBeTruthy()
    expect(aboutLink.parentNode.className.includes('h-0')).toBeTruthy()
    expect(changelogLink.parentNode.className.includes('h-0')).toBeTruthy()
  })

  it('is visible when menu clicked', () => {
    render(<Menu />)

    const fishingLink = screen.getByText('Fishing')
    const aboutLink = screen.getByText('About')
    const changelogLink = screen.getByText('Changelog')
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(fishingLink.parentNode.className.includes('h-0')).toBeFalsy()
    expect(aboutLink.parentNode.className.includes('h-0')).toBeFalsy()
    expect(changelogLink.parentNode.className.includes('h-0')).toBeFalsy()
  })

  it('is h-0 when menu items clicked', () => {
    render(<Menu />)

    const fishingLink = screen.getByText('Fishing')
    const aboutLink = screen.getByText('About')
    const changelogLink = screen.getByText('Changelog')
    const button = screen.getByRole('button')

    expect(fishingLink.parentNode.className.includes('h-0')).toBeTruthy()
    fireEvent.click(button)
    expect(fishingLink.parentNode.className.includes('h-0')).toBeFalsy()
    fireEvent.click(fishingLink)
    expect(fishingLink.parentNode.className.includes('h-0')).toBeTruthy()

    expect(aboutLink.parentNode.className.includes('h-0')).toBeTruthy()
    fireEvent.click(button)
    expect(aboutLink.parentNode.className.includes('h-0')).toBeFalsy()
    fireEvent.click(aboutLink)
    expect(aboutLink.parentNode.className.includes('h-0')).toBeTruthy()

    expect(changelogLink.parentNode.className.includes('h-0')).toBeTruthy()
    fireEvent.click(button)
    expect(changelogLink.parentNode.className.includes('h-0')).toBeFalsy()
    fireEvent.click(changelogLink)
    expect(changelogLink.parentNode.className.includes('h-0')).toBeTruthy()
  })
})
