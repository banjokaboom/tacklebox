import { describe, it, expect, beforeAll, afterEach } from '@jest/globals'
import '@testing-library/jest-dom'
import { pickRecipes } from '@/app/personal/what-to-make/useRecipeData'
import recipesJSON from '../../../mockData/recipes.json'

let recipesList = []

beforeAll(() => {
  resetTestData()
})
afterEach(() => {
  resetTestData()
})

function resetTestData() {
  recipesList = recipesJSON.recipes
}

describe('useRecipeData', () => {
  it('loads recipes', async () => {
    const result = pickRecipes(7, recipesList)

    expect(result.recipes.length).toBeGreaterThan(0)
  })

  it("doesn't have more than 2 beef recipes", async () => {
    const result = pickRecipes(7, recipesList)

    const beefIngredients = [
      'beef',
      'steak',
      'beef short ribs',
      'ground beef',
      'steak tips',
    ]
    let beefRecipeCount = 0

    result.recipes.forEach((recipe) => {
      for (let beefCount = 0; beefCount < beefIngredients.length; beefCount++) {
        if (recipe.ingredients.includes(beefIngredients[beefCount])) {
          beefRecipeCount++
        }
      }
    })

    expect(beefRecipeCount).toBeLessThanOrEqual(2)
  })

  it("doesn't have more than 1 pasta recipe", async () => {
    const result = pickRecipes(7, recipesList)

    let pastaRecipeCount = 0

    result.recipes.forEach((recipe) => {
      if (recipe.ingredients.includes('pasta')) {
        pastaRecipeCount++
      }
    })

    expect(pastaRecipeCount).toBeLessThanOrEqual(1)
  })
})
