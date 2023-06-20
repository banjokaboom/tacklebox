'use client'

import * as recipesList from './recipes.js'
import { useState, useEffect } from 'react'

class CookingData {
  public recipes: Recipe[]
  public ingredients: string[]

  constructor() {
    this.recipes = []
    this.ingredients = []
  }
}

class Recipe {
  public name: string
  public seasons: string[]
  public frequency: number
  public ingredients: string[]

  constructor() {
    this.name = ''
    this.seasons = []
    this.frequency = 0
    this.ingredients = []
  }
}

export default function WhatToMake() {
  let [data, setData] = useState(new CookingData())
  let [numRecipes, setNumRecipes] = useState(7)

  useEffect(() => {
    async function getData(numRecipes) {
      const data = await pickRecipes(numRecipes)

      if (!isDataLoaded) {
        setData(data)
      }
    }

    function pickRecipes(numRecipes) {
      let cookingData = new CookingData()

      cookingData.recipes = []
      cookingData.ingredients = []

      const beefIngredients = [
        'beef',
        'steak',
        'beef short ribs',
        'ground beef',
        'steak tips',
      ]
      let countNumOfBeefRecipes = 0
      let countNumOfPastaRecipes = 0
      const numMealsToCook = numRecipes ?? 7

      recipesList.forEach(function (recipe: Recipe) {
        if (recipe.frequency == 1 && isRecipeForSeason(recipe)) {
          cookingData.recipes.push(recipe)
        }
      })

      while (cookingData.recipes.length < numMealsToCook) {
        const recipe =
          recipesList[Math.floor(Math.random() * recipesList.length)]
        console.log(recipe)

        if (!isRecipeForSeason(recipe)) {
          continue
        }

        if (cookingData.recipes.includes(recipe)) {
          console.log('Recipe ' + recipe.name + ' already in the list.')
          continue
        }

        let hasBeef = false
        for (
          let beefCount = 0;
          beefCount < beefIngredients.length;
          beefCount++
        ) {
          if (recipe.ingredients.includes(beefIngredients[beefCount])) {
            hasBeef = true
          }
        }

        if (hasBeef) {
          if (countNumOfBeefRecipes >= 2) {
            console.log("Can't have too much beef!")
            continue
          } else {
            countNumOfBeefRecipes++
          }
        }

        if (recipe.ingredients.includes('pasta')) {
          if (countNumOfPastaRecipes >= 1) {
            console.log("Can't have too much pasta!")
            continue
          } else {
            countNumOfPastaRecipes++
          }
        }

        const result = Math.floor(Math.random() * (1 / recipe.frequency)) + 1

        if (result == 1) {
          cookingData.recipes.push(recipe)
        } else {
          console.log('Better luck next time, ' + recipe.name + '!')
        }
      }

      console.log(cookingData.recipes)

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
      let todayMonth = new Date().getMonth() + 1
      const isWinter = todayMonth >= 1 && todayMonth <= 3
      const isSpring = todayMonth >= 4 && todayMonth <= 6
      const isSummer = todayMonth >= 7 && todayMonth <= 9
      const isFall = todayMonth >= 10 && todayMonth <= 12

      if (isWinter && !recipe.seasons.includes('winter')) {
        console.log('Is winter and recipe is not for winter season.')
        return false
      } else if (isSpring && !recipe.seasons.includes('spring')) {
        console.log('Is spring and recipe is not for spring season.')
        return false
      } else if (isSummer && !recipe.seasons.includes('summer')) {
        console.log('Is summer and recipe is not for summer season.')
        return false
      } else if (isFall && !recipe.seasons.includes('fall')) {
        console.log('Is fall and recipe is not for fall season.')
        return false
      }

      return true
    }

    let isDataLoaded = false

    getData(numRecipes)

    return () => {
      isDataLoaded = true
    }
  }, [numRecipes])

  function copyIngredients() {
    let copyString = ''
    document
      .querySelectorAll(
        'input[type="checkbox"][name="ingredient"]:not(:checked) ~ label'
      )
      .forEach((label) => {
        copyString += label.textContent + '\n'
      })

    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(copyString)
      alert('Copied ingredients to the clipboard!')
    } else {
      alert('Copying not supported.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl pb-4">What to Make</h1>
        <hr className="pb-4" />
        <div className="pb-4">
          <label htmlFor="numRecipes" className="pb-4 block">
            Number of Meals to Cook
          </label>
          <input
            type="number"
            name="numRecipes"
            id="numRecipes"
            min="1"
            max="7"
            inputMode="numeric"
            onChange={(e) => {
              setNumRecipes(parseInt(e.target.value))
            }}
            className="text-slate-700 leading-4 p-2 block max-w-full"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-2xl pb-8 pt-8">Meals to cook this week</h2>
            <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
              {data.recipes.map((r) => (
                <p className="pb-4 last:pb-0" key={r.name}>
                  {r.name}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl pb-8 pt-8">
              Ingredients to add to the shopping list
            </h2>
            <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
              {data.ingredients.map((i) => (
                <div className="pb-4 last:pb-0" key={i}>
                  <input
                    type="checkbox"
                    name="ingredient"
                    id={'ingredient-' + i.replace(/\s/gim, '-').toLowerCase()}
                  />
                  <label
                    htmlFor={
                      'ingredient-' + i.replace(/\s/gim, '-').toLowerCase()
                    }
                    className="ml-4"
                  >
                    {i}
                  </label>
                </div>
              ))}
              <button
                onClick={copyIngredients}
                className="p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md"
              >
                Copy Ingredients
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
