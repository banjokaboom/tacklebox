import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import WeatherDataChild from '@/app/classes/WeatherDataChild'

describe('WeatherDataChild', () => {
  it('initializes with empty values', () => {
    const weatherDataChild = new WeatherDataChild()

    expect(weatherDataChild.outdoorTemp).toBe('')
    expect(weatherDataChild.waterTemp).toBe('')
    expect(weatherDataChild.conditions).toBe('')
    expect(weatherDataChild.wind).toBe('')
  })
})
