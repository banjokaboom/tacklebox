import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import AstroData from '@/app/classes/AstroData'

describe('AstroData', () => {
  it('initializes with empty values', () => {
    const astroData = new AstroData()

    expect(astroData.sunrise).toBe('')
    expect(astroData.sunset).toBe('')
    expect(astroData.moonrise).toBe('')
    expect(astroData.moonset).toBe('')
    expect(astroData.moon_phase).toBe('')
  })
})
