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
import WhatToFish from '@/app/fishing/what-to-fish/page'
import '@testing-library/jest-dom'
import weatherJSON from '../../../mockData/weather.json'
import tackleJSON from '../../../mockData/tackle.json'
import cityStateJSON from '../../../mockData/cityStates.json'
import speciesJSON from '../../../mockData/species.json'

const server = setupServer(
  rest.get('/api/weather', (req, res, ctx) => {
    return res(ctx.json(weatherJSON))
  }),
  rest.get('/api/tackle', (req, res, ctx) => {
    return res(ctx.json({ tackle: tackleJSON.tackle }))
  }),
  rest.get('/api/cityStates', (req, res, ctx) => {
    return res(ctx.json({ cityStates: cityStateJSON.cityStates }))
  }),
  rest.get('/api/species', (req, res, ctx) => {
    return res(ctx.json({ species: speciesJSON.species }))
  })
)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())

describe('WhatToFish', () => {
  it('renders a heading', () => {
    render(<WhatToFish />)

    const heading = screen.getByRole('heading', {
      name: /What to Fish/i,
    })

    const tipOfTheDay = screen.getByText(/Tip of the Day/i)

    expect(heading).toBeInTheDocument()
    expect(tipOfTheDay).toBeInTheDocument()
  })

  it('renders different tip of the day if date greater than tips length', () => {
    let date = new Date()
    date.setDate('30')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    render(<WhatToFish />)

    const tipOfTheDay = screen.getByText(/Tip of the Day/i)

    expect(tipOfTheDay).toBeInTheDocument()

    // eslint-disable-next-line
    jest.useRealTimers()
  })

  it('loads tackle when zip is entered', async () => {
    const user = userEvent.setup()

    render(<WhatToFish />)

    const input = await screen.findByLabelText('ZIP Code')

    await user.type(input, '01516')

    const heading = await screen.findByText('Bait')

    expect(heading).toBeInTheDocument()
  })

  it('loads tackle when state is selected', async () => {
    const user = userEvent.setup()

    render(<WhatToFish />)

    const combobox = await screen.findByLabelText('State')

    await user.selectOptions(combobox, 'Boston,Massachusetts')

    const heading = await screen.findByText('Bait')

    expect(heading).toBeInTheDocument()
  })

  it('loads tackle when geolocation is used', async () => {
    const user = userEvent.setup()

    render(<WhatToFish />)

    const button = await screen.findByText('Use Current Location')

    await user.click(button)

    const message = await screen.findByText('Bait')

    expect(message).toBeInTheDocument()
  })

  it('loads tackle when freshwater is selected', async () => {
    const user = userEvent.setup()

    render(<WhatToFish />)

    const input = await screen.findByLabelText('ZIP Code')

    await user.type(input, '01516')

    const combobox = await screen.findByLabelText('Water Type?')

    await user.selectOptions(combobox, 'freshwater boat')

    const heading = await screen.findByText('Bait')

    expect(heading).toBeInTheDocument()
  })

  it('resets to initial display when Clear is clicked', async () => {
    const user = userEvent.setup()

    render(<WhatToFish />)

    const input = await screen.findByLabelText('ZIP Code')

    await user.type(input, '01516')

    const button = await screen.findByText('Clear')

    await user.click(button)

    const starterText = await screen.findByText(
      'To start, provide a ZIP, choose a State, or use your current location.'
    )

    expect(starterText).toBeInTheDocument()
  })
})
