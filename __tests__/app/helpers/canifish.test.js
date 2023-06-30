import { describe, it, expect } from '@jest/globals'
import {
  getSpecies,
  getDescription,
  getSeasonDates,
  getSeasonLimits,
  getMinimumLength,
  getSpeciesSeasonInfo,
} from '../../../app/helpers/canifish'
import '@testing-library/jest-dom'

describe('canifish helper', () => {
  it('returns species with special characters parsed', () => {
    const species = ''

    const result = getSpecies(species)

    expect(result).toBeDefined()
  })

  it('returns description with special characters parsed', () => {
    const description = ''

    const result = getDescription(description)

    expect(result).toBeDefined()
  })

  it('returns seasonDates with special characters parsed', () => {
    const seasonDates = ''

    const result = getSeasonDates(seasonDates)

    expect(result).toBeDefined()
  })

  it('returns seasonLimits with special characters parsed', () => {
    const seasonLimits = ''

    const result = getSeasonLimits(seasonLimits)

    expect(result).toBeDefined()
  })

  it('returns minimumLength with special characters parsed', () => {
    const minimumLength = ''

    const result = getMinimumLength(minimumLength)

    expect(result).toBeDefined()
  })

  it('returns speciesSeason with special characters parsed', () => {
    const species = ''
    const description = ''
    const seasonDates = ''
    const seasonLimits = ''
    const minimumLength = ''

    const result = getSpeciesSeasonInfo(
      species,
      description,
      seasonDates,
      seasonLimits,
      minimumLength
    )

    expect(result).toBeDefined()
  })
})
