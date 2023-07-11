import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Menu from '@/app/components/menu'
import '@testing-library/jest-dom'

describe('Menu', () => {
  it('has all proper link text', () => {
    render(<Menu />)

    const homeLink = screen.getByText('Home')
    const homeMaintenanceLink = screen.getByText('Home Maintenance')
    const fishingLink = screen.getByText('Fishing')
    const personalLink = screen.getByText('Personal')
    const aboutLink = screen.getByText('About')
    const changelogLink = screen.getByText('Changelog')

    expect(homeLink).toBeInTheDocument()
    expect(homeMaintenanceLink).toBeInTheDocument()
    expect(fishingLink).toBeInTheDocument()
    expect(personalLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(changelogLink).toBeInTheDocument()
  })

  it('is h-0 when menu not clicked', () => {
    render(<Menu />)

    const homeLink = screen.getByText('Home')
    const homeMaintenanceLink = screen.getByText('Home Maintenance')
    const fishingLink = screen.getByText('Fishing')
    const personalLink = screen.getByText('Personal')
    const aboutLink = screen.getByText('About')
    const changelogLink = screen.getByText('Changelog')

    expect(homeLink.parentNode.className.includes('h-0')).toBeTruthy()
    expect(
      homeMaintenanceLink.parentNode.className.includes('h-0')
    ).toBeTruthy()
    expect(fishingLink.parentNode.className.includes('h-0')).toBeTruthy()
    expect(personalLink.parentNode.className.includes('h-0')).toBeTruthy()
    expect(aboutLink.parentNode.className.includes('h-0')).toBeTruthy()
    expect(changelogLink.parentNode.className.includes('h-0')).toBeTruthy()
  })

  it('is visible when menu clicked', () => {
    render(<Menu />)

    const homeLink = screen.getByText('Home')
    const homeMaintenanceLink = screen.getByText('Home Maintenance')
    const fishingLink = screen.getByText('Fishing')
    const personalLink = screen.getByText('Personal')
    const aboutLink = screen.getByText('About')
    const changelogLink = screen.getByText('Changelog')
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(homeLink.parentNode.className.includes('h-0')).toBeFalsy()
    expect(homeMaintenanceLink.parentNode.className.includes('h-0')).toBeFalsy()
    expect(fishingLink.parentNode.className.includes('h-0')).toBeFalsy()
    expect(personalLink.parentNode.className.includes('h-0')).toBeFalsy()
    expect(aboutLink.parentNode.className.includes('h-0')).toBeFalsy()
    expect(changelogLink.parentNode.className.includes('h-0')).toBeFalsy()
  })

  it('is h-0 when menu items clicked', () => {
    render(<Menu />)

    const homeLink = screen.getByText('Home')
    const homeMaintenanceLink = screen.getByText('Home Maintenance')
    const fishingLink = screen.getByText('Fishing')
    const personalLink = screen.getByText('Personal')
    const aboutLink = screen.getByText('About')
    const changelogLink = screen.getByText('Changelog')
    const button = screen.getByRole('button')

    expect(homeLink.parentNode.className.includes('h-0')).toBeTruthy()
    fireEvent.click(button)
    expect(homeLink.parentNode.className.includes('h-0')).toBeFalsy()
    fireEvent.click(homeLink)
    expect(homeLink.parentNode.className.includes('h-0')).toBeTruthy()

    expect(
      homeMaintenanceLink.parentNode.className.includes('h-0')
    ).toBeTruthy()
    fireEvent.click(button)
    expect(homeMaintenanceLink.parentNode.className.includes('h-0')).toBeFalsy()
    fireEvent.click(homeMaintenanceLink)
    expect(
      homeMaintenanceLink.parentNode.className.includes('h-0')
    ).toBeTruthy()

    expect(fishingLink.parentNode.className.includes('h-0')).toBeTruthy()
    fireEvent.click(button)
    expect(fishingLink.parentNode.className.includes('h-0')).toBeFalsy()
    fireEvent.click(fishingLink)
    expect(fishingLink.parentNode.className.includes('h-0')).toBeTruthy()

    expect(personalLink.parentNode.className.includes('h-0')).toBeTruthy()
    fireEvent.click(button)
    expect(personalLink.parentNode.className.includes('h-0')).toBeFalsy()
    fireEvent.click(personalLink)
    expect(personalLink.parentNode.className.includes('h-0')).toBeTruthy()

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
