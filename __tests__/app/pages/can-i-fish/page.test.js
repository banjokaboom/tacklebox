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

let fwFishingData = []
let swFishingData = []

const server = setupServer(
  rest.get('http://localhost:5555/canifish/freshMA', (req, res, ctx) => {
    return res(ctx.json({ fishingData: fwFishingData, regulationsLink: '' }))
  }),
  rest.get('http://localhost:5555/canifish/saltMA', (req, res, ctx) => {
    return res(ctx.json({ fishingData: swFishingData, regulationsLink: '' }))
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

  it('says you can fish', async () => {
    render(<CanIFish />)

    const yesText = await screen.findByText('Can I Fish: Yes')

    expect(yesText).toBeInTheDocument()
  })

  it("says you can't fish", async () => {
    fwFishingData[0].seasonDates = ['Jan. 1 2000 – Dec. 31 2000']
    swFishingData[0].seasonDates = ['Jan. 1 2000 – Dec. 31 2000']

    render(<CanIFish />)

    const noText = await screen.findByText('Can I Fish: No')

    expect(noText).toBeInTheDocument()
  })
})
