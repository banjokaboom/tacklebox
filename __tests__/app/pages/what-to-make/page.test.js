import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from '@jest/globals'
import userEvent from '@testing-library/user-event'
import WhatToMake from '@/app/what-to-make/page'
import '@testing-library/jest-dom'
import recipesJSON from '../../../mockData/recipes.json'

const server = setupServer(
  rest.get('/api/recipes', (req, res, ctx) => {
    return res(ctx.json({ recipes: recipesJSON.recipes }))
  })
)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})

afterAll(() => server.close())

describe('WhatToMake', () => {
  it('renders a heading', async () => {
    render(<WhatToMake />)

    const heading = await screen.findByRole('heading', {
      name: /What to Make/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('loads recipes when numRecipes changes', async () => {
    const numRecipes = '6'

    const { container } = render(<WhatToMake />)

    const input = container.querySelector('input[type="number"]')

    await userEvent.clear(input)
    await userEvent.type(input, numRecipes)

    const message = await screen.findByText('Successfully loaded recipes', {
      exact: false,
    })
    expect(message).toBeInTheDocument()
  })

  it('copies ingredients', async () => {
    const numRecipes = '1'

    const { container } = render(<WhatToMake />)

    const input = container.querySelector('input[type="number"]')

    await userEvent.clear(input)
    await userEvent.type(input, numRecipes)

    const button = await screen.findByText('Copy Ingredients')

    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(navigator.clipboard.readText()).not.toBeUndefined()
    expect(navigator.clipboard.readText()).not.toBe('')
  })
})
