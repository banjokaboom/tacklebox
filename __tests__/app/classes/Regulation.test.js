import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import Regulation from '@/app/classes/Regulation'

describe('Regulation', () => {
  it('initializes with empty values', () => {
    const regulation = new Regulation()

    expect(regulation.species).toBe('')
    expect(regulation.description).toBe('')
    expect(regulation.seasonDates.length).toBe(0)
    expect(regulation.seasonLimits.length).toBe(0)
    expect(regulation.minimumLength).toBe('')
  })
})
