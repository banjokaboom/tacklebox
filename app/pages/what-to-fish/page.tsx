'use client'

import * as tackleJSON from './tackle.json'
import * as cityStateJSON from './cityStates.json'
import { useState, useEffect, useMemo } from 'react'
import Loader from '../../components/loader'
import {
  getFishingData,
  Tackle,
  FishingData,
  CityState,
} from './useFishingData'
import ContentSection from '@/app/components/content'

export default function WhatToFish() {
  let [zip, setZip] = useState('01516')
  let [cityState, setCityState] = useState('')
  let [useCurrentWeather, setUseCurrentWeather] = useState(true)
  let [data, setData] = useState(new FishingData())

  const tackleList: Tackle[] = useMemo(() => Array.from(tackleJSON.tackle), [])
  const cityStateList: CityState[] = useMemo(
    () => Array.from(cityStateJSON.cityStates),
    []
  )

  useEffect(() => {
    async function getData() {
      if (isDataLoaded) {
        return
      }

      const fishingData = await getFishingData(
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
              <ContentSection
                title="Species to target"
                content={data.species}
              ></ContentSection>

              <ContentSection
                title="Lure colors to use now"
                content={data.baitRecommendations.colorsToUse}
              ></ContentSection>

              <ContentSection
                title="Baits to use now"
                content={data.baitRecommendations.baitsToUse}
              ></ContentSection>

              <ContentSection
                title="Lures and rigs to use today"
                content={data.tackle.map((t) => (
                  <p className="pb-4" key={t.name}>
                    {t.name}
                  </p>
                ))}
              ></ContentSection>
            </div>
            <div>
              <ContentSection
                title="Season"
                content={data.seasons}
              ></ContentSection>

              <ContentSection
                title="Best times to fish"
                content={
                  <div>
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
                }
              ></ContentSection>

              <ContentSection
                title="Current Weather"
                content={
                  <div>
                    <p className="pb-4">
                      Outdoor Temperature: {data.weather.current.outdoorTemp}
                    </p>
                    <p className="pb-4">
                      Estimated Water Temperature:{' '}
                      {data.weather.current.waterTemp}
                    </p>
                    <p className="pb-4">
                      Conditions: {data.weather.current.conditions}
                    </p>
                    <p>Wind: {data.weather.current.wind}</p>
                  </div>
                }
              ></ContentSection>

              <ContentSection
                title="Today's Weather"
                content={
                  <div>
                    <p className="pb-4">
                      Outdoor Temperature: {data.weather.forecast.outdoorTemp}
                    </p>
                    <p className="pb-4">
                      Estimated Water Temperature:{' '}
                      {data.weather.forecast.waterTemp}
                    </p>
                    <p className="pb-4">
                      Conditions: {data.weather.forecast.conditions}
                    </p>
                    <p>Wind: {data.weather.forecast.wind}</p>
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
