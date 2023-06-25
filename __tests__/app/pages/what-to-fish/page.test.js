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
import WhatToFish from '../../../../app/pages/what-to-fish/page'
import '@testing-library/jest-dom'

// eslint-disable-next-line
jest.mock('../../../../app/pages/what-to-fish/tackle.js', () => [], {
  virtual: true,
})
// eslint-disable-next-line
jest.mock('../../../../app/pages/what-to-fish/cityStates.js', () => [], {
  virtual: true,
})

let weatherData = {}
let date = new Date()

const server = setupServer(
  rest.get('http://api.weatherapi.com/v1/forecast.json', (req, res, ctx) => {
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
  date = new Date()

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

  it('renders for spring', async () => {
    date.setMonth('5')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)
    render(<WhatToFish />)

    const heading = screen.getByRole('heading', {
      name: /What to Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders for summer', async () => {
    date.setMonth('8')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)
    render(<WhatToFish />)

    const heading = screen.getByRole('heading', {
      name: /What to Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders for fall', async () => {
    date.setMonth('11')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)
    render(<WhatToFish />)

    const heading = screen.getByRole('heading', {
      name: /What to Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders for winter', async () => {
    date.setMonth('2')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)
    render(<WhatToFish />)

    const heading = screen.getByRole('heading', {
      name: /What to Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders for warm water', async () => {
    weatherData.current.feelslike_f = 100

    render(<WhatToFish />)

    const heading = screen.getByRole('heading', {
      name: /What to Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders for cold water', async () => {
    weatherData.current.feelslike_f = 32

    render(<WhatToFish />)

    const heading = screen.getByRole('heading', {
      name: /What to Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
