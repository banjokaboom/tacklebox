'use client'

import * as recipesJSON from './recipes.json'
import { useState, useEffect, useMemo } from 'react'
import Loader from '../../components/loader'
import { pickRecipes, Recipe, CookingData } from './useRecipeData'
import ContentSection from '@/app/components/content'

export default function WhatToMake() {
  let [data, setData] = useState(new CookingData())
  let [numRecipes, setNumRecipes] = useState(7)
  let [refreshCount, setRefreshCount] = useState(0)

  const recipesList: Recipe[] = useMemo(
    () => Array.from(recipesJSON.recipes),
    []
  )

  useEffect(() => {
    async function getData() {
      const data = await pickRecipes(numRecipes, recipesList)

      if (!isDataLoaded) {
        setData(data)
      }
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [numRecipes, recipesList, refreshCount])

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
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement('textarea')
      textArea.value = copyString

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = 'absolute'
      textArea.style.left = '-999999px'

      document.body.prepend(textArea)
      textArea.select()

      try {
        document.execCommand('copy')
        alert('Copied ingredients to the clipboard!')
      } catch (error) {
        console.error(error)
        alert('Copying not supported. Check log for details.')
      } finally {
        textArea.remove()
      }
    }
  }

  function refresh() {
    setRefreshCount(refreshCount + 1)
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
            value={numRecipes}
            inputMode="numeric"
            onChange={(e) => {
              setNumRecipes(parseInt(e.target.value))
            }}
            className="text-slate-700 leading-4 p-2 block max-w-full mb-4"
          />
          <button
            onClick={refresh}
            className="p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md"
          >
            Refresh
          </button>
        </div>

        {data.recipes.length == 0 && <Loader />}
        {data.recipes.length > 0 && (
          <div className="flex flex-col lg:flex-row justify-between">
            <div>
              <ContentSection
                title="Meals to cook this week"
                subtitle={null}
                content={
                  <div>
                    {data.recipes.map((r) => (
                      <p className="pb-4 last:pb-0" key={r.name}>
                        {r.name}
                      </p>
                    ))}
                  </div>
                }
              ></ContentSection>
            </div>
            <div>
              <ContentSection
                title="Ingredients to add to the shopping list"
                subtitle={null}
                content={
                  <div>
                    {data.ingredients.map((i) => (
                      <div className="pb-4 last:pb-0" key={i}>
                        <input
                          type="checkbox"
                          name="ingredient"
                          id={
                            'ingredient-' +
                            i.replace(/\s/gim, '-').toLowerCase()
                          }
                        />
                        <label
                          htmlFor={
                            'ingredient-' +
                            i.replace(/\s/gim, '-').toLowerCase()
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
                }
              ></ContentSection>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
