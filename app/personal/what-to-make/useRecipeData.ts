import CookingData from '@/app/classes/CookingData'
import Recipe from '@/app/classes/Recipe'

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

  let todayMonth = new Date().getMonth() + 1
  const isWinter = todayMonth >= 1 && todayMonth <= 3
  const isSpring = todayMonth >= 4 && todayMonth <= 6
  const isSummer = todayMonth >= 7 && todayMonth <= 9
  const isFall = todayMonth >= 10 && todayMonth <= 12

  if (isWinter && !recipe.seasons.includes('winter')) {
    return false
  } else if (isSpring && !recipe.seasons.includes('spring')) {
    return false
  } else if (isSummer && !recipe.seasons.includes('summer')) {
    return false
  } else if (isFall && !recipe.seasons.includes('fall')) {
    return false
  }

  return true
}
