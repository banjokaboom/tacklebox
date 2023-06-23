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

let weatherData = {
  location: {
    name: 'Boston',
    region: 'Massachusetts',
    country: 'United States of America',
    lat: 42.36,
    lon: -71.06,
    tz_id: 'America/New_York',
    localtime_epoch: 1687491648,
    localtime: '2023-06-22 23:40',
  },
  current: {
    last_updated_epoch: 1687491000,
    last_updated: '2023-06-22 23:30',
    temp_c: 16.7,
    temp_f: 62.1,
    is_day: 0,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
      code: 1003,
    },
    wind_mph: 6.9,
    wind_kph: 11.2,
    wind_degree: 50,
    wind_dir: 'NE',
    pressure_mb: 1020.0,
    pressure_in: 30.13,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 80,
    cloud: 75,
    feelslike_c: 16.7,
    feelslike_f: 62.1,
    vis_km: 16.0,
    vis_miles: 9.0,
    uv: 1.0,
    gust_mph: 7.6,
    gust_kph: 12.2,
  },
  forecast: {
    forecastday: [
      {
        date: '2023-06-22',
        date_epoch: 1687392000,
        day: {
          maxtemp_c: 19.5,
          maxtemp_f: 67.1,
          mintemp_c: 11.9,
          mintemp_f: 53.4,
          avgtemp_c: 15.5,
          avgtemp_f: 59.9,
          maxwind_mph: 8.9,
          maxwind_kph: 14.4,
          totalprecip_mm: 0.0,
          totalprecip_in: 0.0,
          totalsnow_cm: 0.0,
          avgvis_km: 6.9,
          avgvis_miles: 4.0,
          avghumidity: 90.0,
          daily_will_it_rain: 0,
          daily_chance_of_rain: 0,
          daily_will_it_snow: 0,
          daily_chance_of_snow: 0,
          condition: {
            text: 'Mist',
            icon: '//cdn.weatherapi.com/weather/64x64/day/143.png',
            code: 1030,
          },
          uv: 4.0,
        },
      },
    ],
  },
}

const server = setupServer(
  rest.get('http://api.weatherapi.com/v1/forecast.json', (req, res, ctx) => {
    return res(ctx.json(weatherData))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('WhatToFish', () => {
  it('renders a heading', () => {
    render(<WhatToFish />)

    const heading = screen.getByRole('heading', {
      name: /What to Fish/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
