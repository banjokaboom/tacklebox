import { describe, it, expect } from '@jest/globals'
import { compareDates } from '../../../app/helpers/date'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('can compare dates', () => {
    const dates = 'Jan 1 - Dec 31'

    const result = compareDates(dates)

    expect(result).toBeTruthy()
  })

  it('can compare dates with periods', () => {
    const dates = 'Jan. 1 - Dec. 31'

    const result = compareDates(dates)

    expect(result).toBeTruthy()
  })

  it('can compare dates with years', () => {
    const today = new Date()

    const dates =
      'Jan 1 ' + today.getFullYear() + ' - Dec. 31 ' + today.getFullYear()

    const result = compareDates(dates)

    expect(result).toBeTruthy()
  })

  it('can compare dates with only second date having year', () => {
    const today = new Date()

    const dates = 'Jan 1 - Dec. 31 ' + today.getFullYear()

    const result = compareDates(dates)

    expect(result).toBeTruthy()
  })

  it('can compare dates containing previous year', () => {
    const today = new Date()
    let todayLastYear = new Date()
    todayLastYear.setFullYear(today.getFullYear() - 1)

    const dates =
      'Dec 31 ' +
      todayLastYear.getFullYear() +
      ' - Dec. 31 ' +
      today.getFullYear()

    const result = compareDates(dates)

    expect(result).toBeTruthy()
  })

  it('can compare dates with missing year on second date', () => {
    const dates = 'Feb 1 - Jan 31'

    const result = compareDates(dates)

    expect(result).toBeTruthy()
  })

  it('allows for All Year text', () => {
    const dates = 'All Year'

    const result = compareDates(dates)

    expect(result).toBeTruthy()
  })
})
