import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import { Tackle } from '../../../app/what-to-fish/useFishingData'

describe('Tackle', () => {
  it('initializes with empty values', () => {
    const tackle = new Tackle()

    expect(tackle.name).toBe('')
    expect(tackle.species.length).toBe(0)
    expect(tackle.waterTemp.length).toBe(0)
    expect(tackle.type.length).toBe(0)
    expect(tackle.depth.length).toBe(0)
  })
})
