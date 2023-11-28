'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilter,
  faArrowUpAZ,
  faArrowDownZA,
  faSquareCheck,
  faArrowUp19,
  faArrowDown91,
} from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import Tackle from '../classes/Tackle'

interface Props {
  data: any[]
  sortedFilteredData: any[]
  setData: Function
  resetData: Function
}

export default function FilterSort({
  data,
  sortedFilteredData,
  setData,
  resetData,
}: Props) {
  const skippedSortKeys = ['waterClarity', 'weather', 'tip']

  const SORT_DIRECTIONS = {
    ASC: 'ASC',
    DESC: 'DESC',
  }

  const FILTER_VALUES = {
    ALL: 'all',
    PRODUCT: 'product',
    GENERIC: 'generic',
    RIG: ' rig', // space intentional
    LURE: 'lure',
  }

  const isArrayOfTackle = data.find((item) =>
    item.name?.toUpperCase().includes('RIG')
  )

  let [isExpanded, setIsExpanded] = useState(false)
  let [activeSort, setActiveSort] = useState(
    sortedFilteredData.length > 0 && sortedFilteredData[0].confidence
      ? 'confidence|' + SORT_DIRECTIONS.DESC
      : ''
  )
  let [activeFilters, setActiveFilters] = useState([FILTER_VALUES.ALL])

  let className =
    'p-4 gap-4 flex flex-col text-slate-700 bg-slate-50 rounded-md shadow transition-all overflow-hidden absolute top-12 right-0 left-0 sm:left-auto'
  className += isExpanded ? ' opacity-100' : ' h-0 pt-0 pb-0 opacity-0'

  function openFilterSort() {
    setIsExpanded(true)
  }

  function closeFilterSort() {
    setIsExpanded(false)
  }

  function reset() {
    setData(resetData())
    setActiveSort('confidence|' + SORT_DIRECTIONS.DESC)
    setActiveFilters([FILTER_VALUES.ALL])
  }

  function sortBy(sort: string, dataToSort?: any[]) {
    let field = sort.split('|')[0]
    let direction = sort.includes(SORT_DIRECTIONS.ASC)
      ? SORT_DIRECTIONS.ASC
      : SORT_DIRECTIONS.DESC

    const sortedData = (
      dataToSort ? [...dataToSort] : [...sortedFilteredData]
    ).sort((a, b) => {
      if (a[field] < b[field]) {
        return direction == SORT_DIRECTIONS.DESC ? 1 : -1
      }
      if (a[field] > b[field]) {
        return direction == SORT_DIRECTIONS.DESC ? -1 : 1
      }
      // a must be equal to b
      return 0
    })

    if (sort !== activeSort) {
      setActiveSort(sort)
    }

    if (!dataToSort) {
      setData(sortedData)
    }

    return sortedData
  }

  function filterBy(value: string) {
    const isAddingFilter = !activeFilters.includes(value)

    let activeFiltersClone = [...activeFilters]
    let filteredData = resetData()

    if (isAddingFilter) {
      // remove incompatible filters
      if (activeFiltersClone.includes(FILTER_VALUES.ALL)) {
        activeFiltersClone.splice(activeFilters.indexOf(FILTER_VALUES.ALL), 1)
      }
      if (
        value == FILTER_VALUES.PRODUCT &&
        activeFiltersClone.includes(FILTER_VALUES.GENERIC)
      ) {
        activeFiltersClone.splice(
          activeFilters.indexOf(FILTER_VALUES.GENERIC),
          1
        )
      }
      if (
        value == FILTER_VALUES.GENERIC &&
        activeFiltersClone.includes(FILTER_VALUES.PRODUCT)
      ) {
        activeFiltersClone.splice(
          activeFilters.indexOf(FILTER_VALUES.PRODUCT),
          1
        )
      }
      if (
        value == FILTER_VALUES.RIG &&
        activeFiltersClone.includes(FILTER_VALUES.LURE)
      ) {
        activeFiltersClone.splice(activeFilters.indexOf(FILTER_VALUES.LURE), 1)
      }
      if (
        value == FILTER_VALUES.LURE &&
        activeFiltersClone.includes(FILTER_VALUES.RIG)
      ) {
        activeFiltersClone.splice(activeFilters.indexOf(FILTER_VALUES.RIG), 1)
      }

      activeFiltersClone.push(value)
    } else {
      activeFiltersClone.splice(activeFilters.indexOf(value), 1)
    }

    activeFiltersClone =
      activeFiltersClone.length > 0 ? activeFiltersClone : [FILTER_VALUES.ALL]

    activeFiltersClone.forEach((filter) => {
      const isLureOrRigFilter =
        filter == FILTER_VALUES.LURE || filter == FILTER_VALUES.RIG
      filteredData = filteredData.filter((obj) => {
        const keys: string[] = Object.keys(obj)

        let isFound = filter == FILTER_VALUES.ALL || false
        for (let index = 0; index < keys.length; index++) {
          if (isFound) {
            break
          }

          const key = keys[index]
          const value = obj[key]
          if (key == 'name' && isLureOrRigFilter) {
            isFound =
              (filter == FILTER_VALUES.RIG &&
                value.toUpperCase().includes(filter.toUpperCase())) ||
              (filter == FILTER_VALUES.LURE &&
                !value.toUpperCase().includes(FILTER_VALUES.RIG.toUpperCase()))
          } else if (!isLureOrRigFilter) {
            if (typeof value == 'string') {
              isFound = value.toUpperCase().includes(filter.toUpperCase())
            } else if (Array.isArray(value)) {
              isFound = value.includes(filter)
            }
          }
        }

        return isFound
      })
    })

    filteredData = sortBy(activeSort, filteredData)
    setData(filteredData)
    setActiveFilters(activeFiltersClone)
  }

  return (
    <div className="relative">
      <div className="flex flex-row justify-end absolute right-0 top-2">
        <button
          title={(isExpanded ? 'Close ' : '') + 'Filter/Sort'}
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
          onBlur={closeFilterSort}
          className={
            'p-2 w-fit rounded-md flex flex-row items-center ' +
            (activeSort !== '' || !activeFilters.includes(FILTER_VALUES.ALL)
              ? 'bg-yellow-400 hover:bg-slate-50 text-slate-700'
              : '')
          }
        >
          <span>Filter/Sort</span>
          <FontAwesomeIcon icon={faFilter} className="max-h-4 h-4 ml-2" />
        </button>
      </div>
      <div className={className}>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-start gap-2">
            <strong className="mb-2">Filters</strong>
            <button
              className="w-fit underline hover:no-underline transition-[letter-spacing] flex flex-row items-center"
              onClick={() => filterBy(FILTER_VALUES.PRODUCT)}
              onMouseOver={openFilterSort}
              onFocus={openFilterSort}
            >
              <FontAwesomeIcon
                icon={
                  activeFilters.includes(FILTER_VALUES.PRODUCT)
                    ? faSquareCheck
                    : faSquare
                }
                className="max-h-5 h-5 mr-2"
              />
              <span>Branded</span>
            </button>
            <button
              className="w-fit underline hover:no-underline transition-[letter-spacing] flex flex-row items-center"
              onClick={() => filterBy(FILTER_VALUES.GENERIC)}
              onMouseOver={openFilterSort}
              onFocus={openFilterSort}
            >
              <FontAwesomeIcon
                icon={
                  activeFilters.includes(FILTER_VALUES.GENERIC)
                    ? faSquareCheck
                    : faSquare
                }
                className="max-h-5 h-5 mr-2"
              />
              <span>Generic</span>
            </button>
            {isArrayOfTackle && (
              <button
                className="w-fit underline hover:no-underline transition-[letter-spacing] flex flex-row items-center"
                onClick={() => filterBy(FILTER_VALUES.RIG)}
                onMouseOver={openFilterSort}
                onFocus={openFilterSort}
              >
                <FontAwesomeIcon
                  icon={
                    activeFilters.includes(FILTER_VALUES.RIG)
                      ? faSquareCheck
                      : faSquare
                  }
                  className="max-h-5 h-5 mr-2"
                />
                <span>Rigs</span>
              </button>
            )}
            {isArrayOfTackle && (
              <button
                className="w-fit underline hover:no-underline transition-[letter-spacing] flex flex-row items-center"
                onClick={() => filterBy(FILTER_VALUES.LURE)}
                onMouseOver={openFilterSort}
                onFocus={openFilterSort}
              >
                <FontAwesomeIcon
                  icon={
                    activeFilters.includes(FILTER_VALUES.LURE)
                      ? faSquareCheck
                      : faSquare
                  }
                  className="max-h-5 h-5 mr-2"
                />
                <span>Lures</span>
              </button>
            )}
          </div>
          {sortedFilteredData.length > 0 && (
            <div className="flex flex-col items-start gap-2">
              <strong className="mb-2">Sort By</strong>
              {sortedFilteredData.length > 0 &&
                Object.keys(sortedFilteredData[0]).map((key) => {
                  if (
                    !skippedSortKeys.includes(key) &&
                    (typeof sortedFilteredData[0][key] == 'string' ||
                      typeof sortedFilteredData[0][key] == 'number')
                  ) {
                    const sortKeyAsc = `${key}|${SORT_DIRECTIONS.ASC}`
                    const sortKeyDesc = `${key}|${SORT_DIRECTIONS.DESC}`
                    const sortKeyDisplayName =
                      key.charAt(0).toUpperCase() +
                      key.replaceAll('_', ' ').substring(1)
                    return (
                      <div
                        key={key}
                        className="flex flex-col items-start gap-2"
                      >
                        <button
                          className="w-fit underline hover:no-underline transition-[letter-spacing] flex flex-row items-center"
                          onClick={() => sortBy(sortKeyAsc)}
                          onMouseOver={openFilterSort}
                          onFocus={openFilterSort}
                        >
                          <FontAwesomeIcon
                            icon={
                              activeSort == sortKeyAsc
                                ? faSquareCheck
                                : faSquare
                            }
                            className="max-h-5 h-5 mr-2"
                          />
                          <span>
                            {sortKeyDisplayName}
                            <FontAwesomeIcon
                              title="Ascending"
                              icon={
                                typeof sortedFilteredData[0][key] == 'string'
                                  ? faArrowUpAZ
                                  : faArrowUp19
                              }
                              className="max-h-4 h-4 ml-2"
                            />
                          </span>
                        </button>
                        <button
                          className="w-fit underline hover:no-underline transition-[letter-spacing] flex flex-row items-center"
                          onClick={() => sortBy(sortKeyDesc)}
                          onMouseOver={openFilterSort}
                          onFocus={openFilterSort}
                        >
                          <FontAwesomeIcon
                            icon={
                              activeSort == sortKeyDesc
                                ? faSquareCheck
                                : faSquare
                            }
                            className="max-h-5 h-5 mr-2"
                          />
                          <span>
                            {sortKeyDisplayName}
                            <FontAwesomeIcon
                              title="Descending"
                              icon={
                                typeof sortedFilteredData[0][key] == 'string'
                                  ? faArrowDownZA
                                  : faArrowDown91
                              }
                              className="max-h-4 h-4 ml-2"
                            />
                          </span>
                        </button>
                      </div>
                    )
                  }
                })}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end gap-4">
          <button
            className="w-fit underline hover:no-underline transition-[letter-spacing] flex flex-row items-center"
            onClick={reset}
            onMouseOver={openFilterSort}
            onFocus={openFilterSort}
          >
            Reset
          </button>
          <button
            className="w-fit underline hover:no-underline transition-[letter-spacing] flex flex-row items-center"
            onClick={closeFilterSort}
            onMouseOver={openFilterSort}
            onFocus={openFilterSort}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
