import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import OilPriceData from '@/app/classes/OilPriceData'

describe('OilPriceData', () => {
  it('initializes with empty values', () => {
    const oilPriceData = new OilPriceData()

    expect(oilPriceData.price).toBe('')
    expect(oilPriceData.company).toBe('')
    expect(oilPriceData.url).toBe('')
    expect(oilPriceData.oilPrices.length).toBe(0)
  })
})
