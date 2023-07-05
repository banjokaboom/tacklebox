import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Breadcrumbs from '@/app/components/breadcrumbs'
import '@testing-library/jest-dom'

describe('Breadcrumbs', () => {
  it('renders component with Home link', () => {
    render(<Breadcrumbs links={[]} />)

    const title = screen.getByText('Home')

    expect(title).toBeInTheDocument()
  })

  it('renders passed links', () => {
    let breadcrumbs = [
      {
        title: 'What to Make for Dinner',
        href: '/what-to-make',
      },
    ]

    render(<Breadcrumbs links={breadcrumbs} />)

    const title = screen.getByText('What to Make for Dinner')

    expect(title).toBeInTheDocument()
  })
})
