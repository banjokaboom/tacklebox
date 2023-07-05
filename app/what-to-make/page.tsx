'use client'

import { useState, useEffect } from 'react'
import Loader from '../components/loader'
import { pickRecipes } from './useRecipeData'
import ContentSection from '@/app/components/content'
import Message from '@/app/components/message'
import MessageData from '../classes/MessageData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceSix } from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from '../components/breadcrumbs'
import CookingData from '../classes/CookingData'

export default function WhatToMake() {
  let [data, setData] = useState(new CookingData())
  let [numRecipes, setNumRecipes] = useState(7)
  let [refreshCount, setRefreshCount] = useState(0)
  let [message, setMessage] = useState(new MessageData())
  let [recipesList, setRecipesList] = useState([])
  let breadcrumbs = [
    {
      title: 'What to Make for Dinner',
      href: '/what-to-make',
    },
  ]

  useEffect(() => {
    let m = new MessageData()
    setMessage(new MessageData())

    async function getData() {
      if (isDataLoaded) {
        return
      }

      try {
        await fetch('/api/recipes')
          .then((res) => res.json())
          .then((json) => {
            setRecipesList(json.recipes)
          })
      } catch (error: any) {
        console.error(error)
        m.message =
          'An error occurred when loading the recipes. Please refresh the page to try again.'
        m.severity = 'error'
        setMessage(m)
      }
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [])

  useEffect(() => {
    let m = new MessageData()
    setMessage(new MessageData())

    async function getData() {
      if (recipesList.length == 0 || isDataLoaded || isNaN(numRecipes)) {
        return
      }

      setData(new CookingData())

      try {
        const data = await pickRecipes(
          numRecipes,
          recipesList,
          getCheckedRecipes()
        )

        m.message = 'Successfully loaded recipes'
        m.severity = 'success'
        setData(data)
      } catch (error: any) {
        m.message = error
        m.severity = 'error'
      }

      setMessage(m)
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [numRecipes, refreshCount, recipesList])

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

  function getCheckedRecipes() {
    let checkedRecipes: string[] = []

    document
      .querySelectorAll('input[type="checkbox"][name="recipe"]:checked ~ label')
      .forEach((element) => {
        if (element.textContent && element.textContent !== '') {
          checkedRecipes.push(element.textContent)
        }
      })

    return checkedRecipes
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">What to Make</h1>
        <hr className="mb-4" />
        <p className="mb-4">
          This loads a set of ingredients to add to my shopping list based on a
          list of random recipes for the week. The recipes are categorized by
          season and chosen randomly with a frequency modifier (between 0 and
          1). For example, I cook fish every week, so it has a frequency of 1
          and is always on the list.
        </p>
        <p className="mb-4">
          Checking off a recipe in the recipes list keeps it locked in when
          randomizing. Checking off an ingredient in the ingredients list
          removes it from the copied text.
        </p>
        <div className="mb-4">
          <label htmlFor="numRecipes" className="mb-4 block">
            Number of Recipes to Cook
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
            className="p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-flow items-center"
          >
            <span>Randomize recipes</span>
            <FontAwesomeIcon icon={faDiceSix} className="ml-2" />
          </button>
        </div>

        {data.recipes.length == 0 && <Loader />}
        {data.recipes.length > 0 && (
          <div className="flex flex-col lg:flex-row justify-between">
            <div>
              <ContentSection
                title="Recipes to cook this week"
                content={
                  <div>
                    {data.recipes.map((r) => (
                      <div className="mb-4 last:mb-0" key={r.name}>
                        <input
                          type="checkbox"
                          name="recipe"
                          id={
                            'recipe-' +
                            r.name.replace(/\s/gim, '-').toLowerCase()
                          }
                          defaultChecked={r.frequency == 1 || undefined}
                        />
                        <label
                          htmlFor={
                            'recipe-' +
                            r.name.replace(/\s/gim, '-').toLowerCase()
                          }
                          className="ml-4"
                        >
                          {r.name}
                        </label>
                      </div>
                    ))}
                  </div>
                }
                isExpandedByDefault={true}
              ></ContentSection>
              <p className="pt-4 mb-4 text-sm">
                *A recipe with a frequency of 1 will always be checked.
              </p>
            </div>
            <div>
              <ContentSection
                title="Ingredients to add to the shopping list"
                content={
                  <div>
                    {data.ingredients.map((i) => (
                      <div className="mb-4 last:mb-0" key={i}>
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
                  </div>
                }
                isExpandedByDefault={true}
              ></ContentSection>
              <button
                onClick={copyIngredients}
                className="mt-4 p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md"
              >
                Copy Ingredients
              </button>
            </div>
          </div>
        )}
      </div>

      {message.message !== '' && (
        <Message
          message={message.message}
          severity={message.severity}
        ></Message>
      )}
    </div>
  )
}
