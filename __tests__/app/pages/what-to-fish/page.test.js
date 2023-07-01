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
import WhatToFish from '../../../../app/pages/what-to-fish/page'
import '@testing-library/jest-dom'

let weatherData = {}

const server = setupServer(
  rest.get('/api/weather', (req, res, ctx) => {
    return res(ctx.json(weatherData))
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

    expect(heading).toBeInTheDocument()
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

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      'Boston,Massachusetts'
    )

    const heading = await screen.findByText(/Species to target/i)

    expect(heading).toBeInTheDocument()
  })
})
