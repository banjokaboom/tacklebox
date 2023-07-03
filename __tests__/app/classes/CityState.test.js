import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import { CityState } from '../../../app/what-to-fish/useFishingData'

describe('CityState', () => {
  it('initializes with empty values', () => {
    const cityState = new CityState()

    expect(cityState.capital).toBe('')
    expect(cityState.state).toBe('')
    expect(cityState.location.length).toBe(0)
  })
})
