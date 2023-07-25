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
import OilPrices from '@/app/home-maintenance/oil-prices/page'
import '@testing-library/jest-dom'

const server = setupServer(
  rest.get('/api/oilprices', (req, res, ctx) => {
    return res(
      ctx.json({ price: '2.50', company: 'test', url: null, allOilPrices: [] })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('OilPrices', () => {
  it('renders a heading', () => {
    render(<OilPrices />)

    const heading = screen.getByRole('heading', {
      name: /Heating Oil Prices/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders when loading MA zone 10', async () => {
    render(<OilPrices />)

    const stateLabel = await screen.findByText('State')
    expect(stateLabel).toBeInTheDocument()

    const stateCombobox = await screen.findByRole('combobox')
    fireEvent.change(stateCombobox, {
      target: { value: 'massachusetts' },
    })

    const zoneLabel = await screen.findByText('Zone')
    expect(zoneLabel).toBeInTheDocument()

    const comboboxes = await screen.findAllByRole('combobox')
    fireEvent.change(comboboxes[1], {
      target: { value: '10' },
    })

    const message = await screen.findByText(
      'Successfully loaded oil prices for zone: 10'
    )

    expect(message).toBeInTheDocument()
  })
})
