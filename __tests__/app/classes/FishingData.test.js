import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import { FishingData } from '../../../app/what-to-fish/useFishingData'

describe('FishingData', () => {
  it('initializes with empty values', () => {
    const fishingData = new FishingData()

    expect(fishingData.baitRecommendations).not.toBeUndefined()
    expect(fishingData.seasons).toBe('')
    expect(fishingData.tackle.length).toBe(0)
    expect(fishingData.weather).not.toBeUndefined()
    expect(fishingData.species).toBe('')
  })
})
