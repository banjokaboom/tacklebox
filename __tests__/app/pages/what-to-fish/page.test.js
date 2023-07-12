import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent } from '@testing-library/react'
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
import tackleJSON from '../../../mockData/tackle.json'
import cityStateJSON from '../../../mockData/cityStates.json'

let weatherData = {}

const server = setupServer(
  rest.get('/api/weather', (req, res, ctx) => {
    return res(ctx.json(weatherData))
  }),
  rest.get('/api/tackle', (req, res, ctx) => {
    return res(ctx.json({ tackle: tackleJSON.tackle }))
  }),
  rest.get('/api/cityStates', (req, res, ctx) => {
    return res(ctx.json({ cityStates: cityStateJSON.cityStates }))
  })
)

beforeAll(() => {
  resetTestData()
  server.listen()
})
afterEach(() => {
  resetTestData()
  server.resetHandlers()
})
afterAll(() => server.close())

function resetTestData() {
  /* cSpell:disable */
  weatherData = {
    location: {
      name: 'Boston',
      region: 'Massachusetts',
    },
    current: {
      temp_f: 75,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
        code: 1003,
      },
      wind_mph: 6.9,
      cloud: 0,
      feelslike_f: 75,
    },
    forecast: {
      forecastday: [
        {
          day: {
            maxtemp_f: 75,
            mintemp_f: 60,
            avgtemp_f: 62.5,
            maxwind_mph: 8.9,
            condition: {
              text: 'Mist',
            },
          },
          astro: {
            sunrise: '05:22 AM',
            sunset: '08:23 PM',
            moonrise: '01:13 AM',
            moonset: '04:08 PM',
            moon_phase: 'Waning Crescent',
            moon_illumination: '30',
            is_moon_up: 0,
            is_sun_up: 1,
          },
        },
      ],
    },
  }
  /* cSpell:enable */
}

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
    render(<WhatToFish />)

    const input = screen.getByRole('textbox')

    await userEvent.type(input, '01516')

    const heading = await screen.findByText(/Species to target/i)

    expect(heading).toBeInTheDocument()
  })

  it('loads tackle when state is selected', async () => {
    render(<WhatToFish />)

    const combobox = await screen.findByRole('combobox')

    await userEvent.selectOptions(combobox, 'Boston,Massachusetts')

    const message = await screen.findByText(
      /Successfully loaded tackle for location/i,
      { exact: false }
    )
    expect(message).toBeInTheDocument()

    const heading = await screen.findByText(/Species to target/i)
    expect(heading).toBeInTheDocument()
  })

  it('loads tackle when geolocation is used', async () => {
    render(<WhatToFish />)

    const button = screen.getByText('Use Current Location')

    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    const message = await screen.findByText(
      /Successfully loaded tackle for location/i,
      { exact: false }
    )
    expect(message).toBeInTheDocument()

    const heading = await screen.findByText(/Species to target/i)
    expect(heading).toBeInTheDocument()
  })

  it('loads tackle when current weather is used', async () => {
    render(<WhatToFish />)

    const input = screen.getByRole('textbox')

    await userEvent.type(input, '01516')

    await userEvent.selectOptions(screen.getAllByRole('combobox')[1], 'true')

    const heading = await screen.findByText(/Species to target/i)
    expect(heading).toBeInTheDocument()
  })

  it('loads tackle when forecast weather is used', async () => {
    render(<WhatToFish />)

    const input = screen.getByRole('textbox')

    await userEvent.type(input, '01516')

    await userEvent.selectOptions(screen.getAllByRole('combobox')[1], 'false')

    const heading = await screen.findByText(/Species to target/i)
    expect(heading).toBeInTheDocument()
  })
})
