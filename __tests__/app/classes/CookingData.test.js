import { describe, it, expect } from '@jest/globals'
import '@testing-library/jest-dom'
import CookingData from '@/app/classes/CookingData'

describe('CookingData', () => {
  it('initializes with empty values', () => {
    const cookingData = new CookingData()

    expect(cookingData.recipes.length).toBe(0)
    expect(cookingData.ingredients.length).toBe(0)
  })
})
