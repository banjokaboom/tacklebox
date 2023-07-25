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
import TackleBySpecies from '@/app/fishing/tackle-by-species/page'
import '@testing-library/jest-dom'
import tackleJSON from '../../../mockData/tackle.json'

const server = setupServer(
  rest.get('/api/species', (req, res, ctx) => {
    return res(ctx.json({ species: ['largemouth bass'] }))
  }),
  rest.get('/api/tackle', (req, res, ctx) => {
    return res(ctx.json({ tackle: tackleJSON.tackle }))
  })
)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())

describe('TackleBySpecies', () => {
  it('renders a heading', () => {
    render(<TackleBySpecies />)

    const heading = screen.getByRole('heading', {
      name: /Tackle by Species/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders after choosing a species', async () => {
    render(<TackleBySpecies />)

    const speciesCombobox = await screen.findByRole('combobox')
    fireEvent.change(speciesCombobox, {
      target: { value: 'largemouth bass' },
    })

    const heading = await screen.findByText('Lures and rigs to use')

    expect(heading).toBeInTheDocument()
  })
})
