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
import CanIFish from '@/app/fishing/can-i-fish/page'
import '@testing-library/jest-dom'

let fwFishingData = []
let swFishingData = []

const server = setupServer(
  rest.get('/api/freshMA', (req, res, ctx) => {
    return res(
      ctx.json({ fishingData: fwFishingData, regulationsLink: 'www.test.com' })
    )
  }),
  rest.get('/api/saltMA', (req, res, ctx) => {
    return res(
      ctx.json({ fishingData: swFishingData, regulationsLink: 'www.test.com' })
    )
  })
)

beforeAll(() => {
  resetFishingData()
  server.listen()
})
afterEach(() => {
  resetFishingData()
  server.resetHandlers()
})

afterAll(() => server.close())

function resetFishingData() {
  fwFishingData = [
    {
      species: 'Black Bass',
      description: 'Black Bass (Largemouth and Smallmouth, in any combination)',
      seasonDates: ['Jan 1 – Jun 30', 'Jul 1 -  Oct 31', 'Nov 1 - Dec 31'],
      seasonLimits: [' 5', ' '],
      minimumLength: ', 12, ',
    },
  ]
  swFishingData = [
    {
      species: 'Black Sea Bass',
      description: 'Black Sea Bass',
      seasonDates: ['May 20 - Sept 7'],
      seasonLimits: ['4 fish'],
      minimumLength: 'Min: 16.5"',
    },
  ]
}

describe('CanIFish', () => {
  it('renders a heading', () => {
    render(<CanIFish />)

    const heading = screen.getByRole('heading', {
      name: /Can I Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
