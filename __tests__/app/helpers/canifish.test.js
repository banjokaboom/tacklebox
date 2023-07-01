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
    const species = '<p>Trout (Lake)</p>'

    const result = getSpecies(species)

    expect(result).toBe('Trout, Lake')
  })

  it('returns description with special characters parsed', () => {
    const description = '<p>Lake Trout</p>'

    const result = getDescription(description)

    expect(result).toBe('Lake Trout')
  })

  it('returns seasonDates with special characters parsed', () => {
    const seasonDates = 'Jan 1 - July 31<br>Aug 1 - Dec 31'

    const result = getSeasonDates(seasonDates)

    expect(result).toStrictEqual(['Jan 1 - July 31', 'Aug 1 - Dec 31'])
  })

  it('returns seasonLimits with special characters parsed', () => {
    const seasonLimits = '5<br>1'

    const result = getSeasonLimits(seasonLimits)

    expect(result).toStrictEqual(['5', '1'])
  })

  it('returns minimumLength with special characters parsed', () => {
    const minimumLength = '16"<br>12"'

    const result = getMinimumLength(minimumLength)

    expect(result).toBe('16", 12"')
  })

  it('returns speciesSeason with special characters parsed', () => {
    const species = '<p>Trout (Lake)</p>'
    const description = '<p>Lake Trout</p>'
    const seasonDates = 'Jan 1 - July 31<br>Aug 1 - Dec 31'
    const seasonLimits = '5<br>1'
    const minimumLength = '16"<br>12"'

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
