import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import FishingConditions from '@/app/classes/FishingConditions'

describe('FishingConditions', () => {
  it('initializes with empty values', () => {
    const fishingConditions = new FishingConditions()

    expect(fishingConditions.conditionsText).toBe('')
    expect(fishingConditions.positiveConditionsNotes.length).toBe(0)
    expect(fishingConditions.negativeConditionsNotes.length).toBe(0)
  })
})
