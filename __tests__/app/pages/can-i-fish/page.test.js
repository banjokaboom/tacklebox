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
import CanIFish from '../../../../app/pages/can-i-fish/page'
import '@testing-library/jest-dom'

const server = setupServer(
  rest.get('http://localhost:5555/canifish/freshMA', (req, res, ctx) => {
    return res(ctx.json({ fishingData: [], regulationsLink: '' }))
  }),
  rest.get('http://localhost:5555/canifish/saltMA', (req, res, ctx) => {
    return res(ctx.json({ fishingData: [], regulationsLink: '' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('CanIFish', () => {
  it('renders a heading', () => {
    render(<CanIFish />)

    const heading = screen.getByRole('heading', {
      name: /Can I Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
