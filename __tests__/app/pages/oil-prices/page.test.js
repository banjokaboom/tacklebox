import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from '@jest/globals'
import OilPrices from '../../../../app/pages/oil-prices/page'
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
      name: /Oil Prices/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
