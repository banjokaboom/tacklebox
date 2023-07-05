import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('loads price when zone is selected', async () => {
    render(<OilPrices />)

    await userEvent.selectOptions(screen.getByRole('combobox'), '10')

    const heading = await screen.findByText(/Best Price/i)

    expect(heading).toBeInTheDocument()
  })
})
