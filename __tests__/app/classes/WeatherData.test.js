import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import WeatherData from '@/app/classes/WeatherData'
import WeatherDataChild from '@/app/classes/WeatherDataChild'

describe('WeatherData', () => {
  it('initializes with empty values', () => {
    const weatherData = new WeatherData()

    expect(weatherData.outdoorTemp).toBe('')
    expect(weatherData.waterTemp).toBe('')
    expect(weatherData.conditions).toBe('')
    expect(weatherData.wind).toBe('')
    expect(weatherData.location).toBe('')
    expect(weatherData.current).toStrictEqual(new WeatherDataChild())
    expect(weatherData.forecast).toStrictEqual(new WeatherDataChild())
  })
})
