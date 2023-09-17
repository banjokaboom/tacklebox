import CookingData from '@/app/classes/CookingData'
import Recipe from '@/app/classes/Recipe'
import { getSeasons } from '@/app/helpers/date'

export function pickRecipes(
  numRecipes: number,
  recipesList: Recipe[],
  checkedRecipes?: string[]
) {
  let cookingData = new CookingData()

  cookingData.recipes = []
  cookingData.ingredients = []

  if (recipesList.length < numRecipes) {
    return cookingData
  }

  const beefIngredients = [
    'beef',
    'steak',
    'beef short ribs',
    'ground beef',
    'steak tips',
    'burgers',
  ]
  let countNumOfBeefRecipes = 0
  let countNumOfPastaRecipes = 0
  const numRecipesToCook = numRecipes ?? 7

  if (checkedRecipes && checkedRecipes.length > 0) {
    recipesList.forEach(function (recipe: Recipe) {
      if (checkedRecipes.includes(recipe.name)) {
        cookingData.recipes.push(recipe)
      }
    })
  }

  recipesList.forEach(function (recipe: Recipe) {
    if (
      !cookingData.recipes.includes(recipe) &&
      recipe.frequency == 1 &&
      isRecipeForSeason(recipe)
    ) {
      cookingData.recipes.push(recipe)
    }
  })

  while (cookingData.recipes.length < numRecipesToCook) {
    const recipe = recipesList[Math.floor(Math.random() * recipesList.length)]

    if (!isRecipeForSeason(recipe)) {
      continue
    }

    if (cookingData.recipes.includes(recipe)) {
      continue
    }

    let hasBeef = false
    for (let beefCount = 0; beefCount < beefIngredients.length; beefCount++) {
      if (recipe.ingredients.includes(beefIngredients[beefCount])) {
        hasBeef = true
      }
    }

    if (hasBeef) {
      if (countNumOfBeefRecipes >= 2) {
        continue
      } else {
        countNumOfBeefRecipes++
      }
    }

    if (recipe.ingredients.includes('pasta')) {
      if (countNumOfPastaRecipes >= 1) {
        continue
      } else {
        countNumOfPastaRecipes++
      }
    }

    const result = Math.floor(Math.random() * (1 / recipe.frequency)) + 1

    if (result == 1) {
      cookingData.recipes.push(recipe)
    }
  }

  cookingData.recipes.forEach(function (recipe: Recipe) {
    recipe.ingredients.forEach(function (ingredient) {
      if (!cookingData.ingredients.includes(ingredient)) {
        cookingData.ingredients.push(ingredient)
      }
    })
  })

  return cookingData
}

function isRecipeForSeason(recipe: Recipe) {
  if (!recipe) {
    return false
  }

  const seasons = getSeasons()

  for (let seasonCount = 0; seasonCount < seasons.length; seasonCount++) {
    if (recipe.seasons.includes(seasons[seasonCount])) {
      return true
    }
  }

  return false
}
