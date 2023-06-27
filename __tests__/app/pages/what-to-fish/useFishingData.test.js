import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from '@jest/globals'
import '@testing-library/jest-dom'
import { getFishingData } from '../../../../app/pages/what-to-fish/useFishingData'
import * as tackleJSON from '../../../../app/pages/what-to-fish/tackle.json'
import * as cityStateJSON from '../../../../app/pages/what-to-fish/cityStates.json'

let tackleList = []
let cityStatesList = []
let date = new Date()
let weatherData = {}

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
  // eslint-disable-next-line
  jest.useRealTimers()

  tackleList = tackleJSON.tackle
  cityStatesList = cityStateJSON.cityStates

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

describe('useFishingData', () => {
  it('loads recommendations for spring:3', async () => {
    date.setMonth('2')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('spring')).toBeTruthy()
  })

  it('loads recommendations for spring:4', async () => {
    date.setMonth('3')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('spring')).toBeTruthy()
  })

  it('loads recommendations for spring:5', async () => {
    date.setMonth('4')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('spring')).toBeTruthy()
  })

  it('loads recommendations for spring:6', async () => {
    date.setMonth('5')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('spring')).toBeTruthy()
  })

  it('loads recommendations for summer:6', async () => {
    date.setMonth('5')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('summer')).toBeTruthy()
  })

  it('loads recommendations for summer:7', async () => {
    date.setMonth('6')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('summer')).toBeTruthy()
  })

  it('loads recommendations for summer:8', async () => {
    date.setMonth('7')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('summer')).toBeTruthy()
  })

  it('loads recommendations for summer:9', async () => {
    date.setMonth('8')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('summer')).toBeTruthy()
  })

  it('loads recommendations for fall:9', async () => {
    date.setMonth('8')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('fall')).toBeTruthy()
  })

  it('loads recommendations for fall:10', async () => {
    date.setMonth('9')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('fall')).toBeTruthy()
  })

  it('loads recommendations for fall:11', async () => {
    date.setMonth('10')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('fall')).toBeTruthy()
  })

  it('loads recommendations for fall:12', async () => {
    date.setMonth('11')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('fall')).toBeTruthy()
  })

  it('loads recommendations for winter:12', async () => {
    date.setMonth('11')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('winter')).toBeTruthy()
  })

  it('loads recommendations for winter:1', async () => {
    date.setMonth('0')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('winter')).toBeTruthy()
  })

  it('loads recommendations for winter:2', async () => {
    date.setMonth('1')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('winter')).toBeTruthy()
  })

  it('loads recommendations for winter:3', async () => {
    date.setMonth('2')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.seasons.includes('winter')).toBeTruthy()
  })

  it('warning for warm water', async () => {
    weatherData.current.feelslike_f = 100

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.species).toBe('Not ideal fishing weather for any species')
  })

  it('warning for cold water', async () => {
    weatherData.current.feelslike_f = 32

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.species).toBe('Not ideal fishing weather for any species')
  })

  it('loads recommendations using cityState', async () => {
    const result = await getFishingData(
      '',
      'Boston, Massachusetts',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBeGreaterThan(0)
  })

  it('recommends appropriate colors for clear weather', async () => {
    weatherData.current.cloud = 0

    const result = await getFishingData(
      '01516',
      'Boston, Massachusetts',
      true,
      tackleList,
      cityStatesList
    )

    expect(
      result.baitRecommendations.colorsToUse.includes('natural')
    ).toBeTruthy()
  })

  it('recommends appropriate colors for cloudy weather', async () => {
    weatherData.current.cloud = 80

    const result = await getFishingData(
      '01516',
      'Boston, Massachusetts',
      true,
      tackleList,
      cityStatesList
    )

    expect(
      result.baitRecommendations.colorsToUse.includes('bright')
    ).toBeTruthy()
  })

  it("doesn't load when state not selected and zip length < 5", async () => {
    const result = await getFishingData(
      '015',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })

  it('shows no tackle when water is really warm and tackleList has no warm tackle', async () => {
    date.setMonth('7')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    tackleList = [
      {
        name: 'Dropshot Rig',
        species: ['largemouth bass', 'sunfish', 'trout'],
        waterTemp: ['cold'],
        type: ['finesse'],
        depth: ['deep'],
      },
    ]
    weatherData.current.feelslike_f = 100

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })

  it('shows no tackle when water is really warm and tackleList has no deep tackle', async () => {
    date.setMonth('7')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    tackleList = [
      {
        name: 'Dropshot Rig',
        species: ['largemouth bass', 'sunfish', 'trout'],
        waterTemp: ['cold', 'warm'],
        type: ['finesse'],
        depth: ['shallow'],
      },
    ]
    weatherData.current.feelslike_f = 100

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })

  it('shows no tackle when water is cold and tackleList has no cold tackle', async () => {
    date.setMonth('1')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    tackleList = [
      {
        name: 'Dropshot Rig',
        species: ['largemouth bass', 'sunfish', 'trout'],
        waterTemp: ['warm'],
        type: ['finesse'],
        depth: ['deep'],
      },
    ]
    weatherData.current.feelslike_f = 50

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })

  it('shows no tackle when water is cold and tackleList has no deep tackle', async () => {
    date.setMonth('1')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    tackleList = [
      {
        name: 'Dropshot Rig',
        species: ['largemouth bass', 'sunfish', 'trout'],
        waterTemp: ['cold'],
        type: ['finesse'],
        depth: ['shallow'],
      },
    ]
    weatherData.current.feelslike_f = 50

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })

  it('shows no tackle when water is cold and tackleList has no still tackle', async () => {
    date.setMonth('1')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    tackleList = [
      {
        name: 'Dropshot Rig',
        species: ['largemouth bass', 'sunfish', 'trout'],
        waterTemp: ['cold'],
        type: ['reaction'],
        depth: ['deep'],
      },
    ]
    weatherData.current.feelslike_f = 50

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })

  it('shows no tackle when water is cold and tackleList has no finesse tackle', async () => {
    date.setMonth('1')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    tackleList = [
      {
        name: 'Dropshot Rig',
        species: ['largemouth bass', 'sunfish', 'trout'],
        waterTemp: ['cold'],
        type: ['reaction'],
        depth: ['deep'],
      },
    ]
    weatherData.current.feelslike_f = 50

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })

  it('shows no tackle when water is warm and tackleList has no warm tackle', async () => {
    date.setMonth('7')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    tackleList = [
      {
        name: 'Dropshot Rig',
        species: ['largemouth bass', 'sunfish', 'trout'],
        waterTemp: ['cold'],
        type: ['finesse'],
        depth: ['deep'],
      },
    ]
    weatherData.current.feelslike_f = 80

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })

  it('shows no tackle when water is warm and tackleList has no shallow tackle', async () => {
    date.setMonth('7')
    // eslint-disable-next-line
    jest.useFakeTimers().setSystemTime(date)

    tackleList = [
      {
        name: 'Dropshot Rig',
        species: ['largemouth bass', 'sunfish', 'trout'],
        waterTemp: ['cold', 'warm'],
        type: ['finesse'],
        depth: ['deep'],
      },
    ]
    weatherData.current.feelslike_f = 80

    const result = await getFishingData(
      '01516',
      '',
      true,
      tackleList,
      cityStatesList
    )

    expect(result.tackle.length).toBe(0)
  })
})
