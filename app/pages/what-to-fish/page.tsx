'use client'

import * as tackleJSON from './tackle.js'
import * as cityStateJSON from './cityStates.js'
import { useState, useEffect, useMemo } from 'react'
import Loader from '../../components/loader'
import {
  getFishingData,
  Tackle,
  FishingData,
  CityState,
} from './useFishingData'

export default function WhatToFish() {
  let [zip, setZip] = useState('01516')
  let [cityState, setCityState] = useState('')
  let [useCurrentWeather, setUseCurrentWeather] = useState(true)
  let [data, setData] = useState(new FishingData())

  const tackleList: Tackle[] = useMemo(() => Array.from(tackleJSON), [])
  const cityStateList: CityState[] = useMemo(
    () => Array.from(cityStateJSON),
    []
  )

  useEffect(() => {
    async function getData() {
      if (isDataLoaded) {
        return
      }

      let fishingData = new FishingData()

      fishingData = await getFishingData(
        zip,
        cityState,
        useCurrentWeather,
        tackleList,
        cityStateList
      )

      setData(fishingData)
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [zip, cityState, useCurrentWeather, tackleList, cityStateList])

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl pb-4">What to Fish (Freshwater)</h1>
        <hr className="pb-4" />
        <div className="flex flex-col lg:flex-row justify-between lg:items-end">
          <div className="pb-4">
            <label htmlFor="zip" className="pb-4 block">
              ZIP Code
            </label>
            <input
              type="text"
              name="zip"
              id="zip"
              inputMode="numeric"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value)
                setCityState('')
              }}
              className="text-slate-700 leading-4 p-2 block max-w-full"
            />
          </div>
          <div className="pb-4">OR</div>
          <div className="pb-4">
            <label htmlFor="state" className="pb-4 block">
              State
            </label>
            <select
              name="state"
              id="state"
              onChange={(e) => {
                setZip('')
                setCityState(e.target.value)
              }}
              className="text-slate-700 leading-4 p-2 block max-w-full"
              value={cityState}
            >
              <option value=""></option>
              {cityStateList.map((cs, csIndex) => (
                <option key={csIndex} value={cs.capital + ',' + cs.state}>
                  {cs.state}
                </option>
              ))}
            </select>
          </div>
        </div>
        {data.tackle.length == 0 && <Loader />}
        {data.tackle.length > 0 && (
          <div>
            <p className="pb-4">Data loaded for {data.weather.location}</p>
            <label htmlFor="useCurrentWeather" className="pb-4 block">
              Use current weather or forecast?
            </label>
            <select
              name="useCurrentWeather"
              id="useCurrentWeather"
              onChange={(e) => {
                setUseCurrentWeather(e.target.value == 'true')
              }}
              className="text-slate-700 leading-4 p-2 block max-w-full"
              value={'' + useCurrentWeather}
            >
              <option value="true">Current</option>
              <option value="false">Forecast</option>
            </select>
          </div>
        )}
        {data.tackle.length > 0 && (
          <div className="flex flex-col lg:flex-row justify-between lg:space-x-8">
            <div>
              <h2 className="text-2xl pb-8 pt-8">Species to target</h2>
              <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                <p>{data.species}</p>
              </div>

              <h2 className="text-2xl pb-8 pt-8">Lure colors to use now</h2>
              <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                <p>{data.baitRecommendations.colorsToUse}</p>
              </div>

              <h2 className="text-2xl pb-8 pt-8">Baits to use now</h2>
              <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                <p>{data.baitRecommendations.baitsToUse}</p>
              </div>

              <h2 className="text-2xl pb-8 pt-8">
                Lures and rigs to use today
              </h2>
              {data.species.split(',').map((s) => (
                <div key={s}>
                  <h3 className="pb-4 text-xl">{s.toUpperCase()}</h3>
                  <div className="border border-slate-50 bg-slate-700 p-4 rounded-md mb-4">
                    {data.tackle.map(
                      (t) =>
                        t.species.includes(s.trim()) && (
                          <p className="pb-4 last:pb-0" key={t.name}>
                            {t.name}
                          </p>
                        )
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-2xl pb-8 pt-8">Season</h2>
              <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                <p>{data.seasons}</p>
              </div>

              <h2 className="text-2xl pb-8 pt-8">Best times to fish</h2>
              <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                <p>
                  Bad:{' '}
                  {data.seasons.includes('spring') ||
                  data.seasons.includes('fall')
                    ? 'early morning'
                    : 'late morning/early afternoon'}
                </p>
                <p>
                  Good:{' '}
                  {data.seasons.includes('spring') ||
                  data.seasons.includes('fall')
                    ? 'late morning/early afternoon'
                    : 'early morning'}
                </p>
                <p>Best: late afternoon/early evening</p>
              </div>

              <h2 className="text-2xl pb-8 pt-8">Current Weather</h2>
              <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                <p className="pb-4">
                  Outdoor Temperature: {data.weather.current.outdoorTemp}
                </p>
                <p className="pb-4">
                  Estimated Water Temperature: {data.weather.current.waterTemp}
                </p>
                <p className="pb-4">
                  Conditions: {data.weather.current.conditions}
                </p>
                <p>Wind: {data.weather.current.wind}</p>
              </div>

              <h2 className="text-2xl pb-8 pt-8">Today&apos;s Weather</h2>
              <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                <p className="pb-4">
                  Outdoor Temperature: {data.weather.forecast.outdoorTemp}
                </p>
                <p className="pb-4">
                  Estimated Water Temperature: {data.weather.forecast.waterTemp}
                </p>
                <p className="pb-4">
                  Conditions: {data.weather.forecast.conditions}
                </p>
                <p>Wind: {data.weather.forecast.wind}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
