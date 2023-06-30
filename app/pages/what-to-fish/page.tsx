'use client'

import tackleJSON from './tackle.json'
import cityStateJSON from './cityStates.json'
import { useState, useEffect, useMemo } from 'react'
import Loader from '../../components/loader'
import {
  getFishingData,
  Tackle,
  FishingData,
  CityState,
} from './useFishingData'
import ContentSection from '@/app/components/content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import Message, { MessageData } from '@/app/components/message'

export default function WhatToFish() {
  let [zip, setZip] = useState('')
  let [cityState, setCityState] = useState('')
  let [useCurrentWeather, setUseCurrentWeather] = useState(true)
  let [loading, setLoading] = useState(false)
  let [geolocation, setGeolocation] = useState('')
  let [data, setData] = useState(new FishingData())
  let [message, setMessage] = useState(new MessageData())

  const tackleList: Tackle[] = useMemo(() => Array.from(tackleJSON.tackle), [])
  const cityStateList: CityState[] = useMemo(
    () => Array.from(cityStateJSON.cityStates),
    []
  )

  useEffect(() => {
    const location =
      geolocation !== '' ? geolocation : cityState !== '' ? cityState : zip
    let m = new MessageData()
    setMessage(new MessageData())

    async function getData() {
      if (isDataLoaded) {
        return
      }

      setLoading(true)
      setData(new FishingData())

      try {
        const fishingData = await getFishingData(
          zip,
          cityState,
          useCurrentWeather,
          tackleList,
          cityStateList,
          geolocation
        )

        if (fishingData.tackle.length > 0) {
          setData(fishingData)
          m.message = 'Successfully loaded tackle for location: ' + location
          m.severity = 'success'
        } else if (
          geolocation !== '' ||
          cityState != '' ||
          (zip != '' && zip.length == 5)
        ) {
          m.message = 'No tackle loaded for location: ' + location
          m.severity = 'alert'
        }
      } catch (error: any) {
        m.message = error
        m.severity = 'error'
      }

      setMessage(m)
      setLoading(false)
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [
    zip,
    cityState,
    useCurrentWeather,
    tackleList,
    cityStateList,
    geolocation,
  ])

  function getGeolocation() {
    setZip('')
    setCityState('')
    setGeolocation('')
    setLoading(true)

    if (navigator.geolocation) {
      console.log('Using geolocation')
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation(
          position.coords.latitude + ',' + position.coords.longitude
        )
        setLoading(false)
      })
    } else {
      console.log('Geolocation is not available')
    }
  }

  function getFishingTip() {
    const tips = [
      'Use colored baits that match the season, i.e. whites/silvers in winter, yellows/reds in summer.',
      'Hook size correlates to fish size. Size #6 will cover most smaller fish, size #1 will cover most medium size fish, and size 2/0 will be good for bigger bass.',
      "Fish slow when using topwaters. Let the water calm down before starting the retrieve, especially if the fish aren't biting when trying other methods.",
      "If fish are pecking at the bait and pulling it but aren't real heavy-feeling, they're little babies and you're not gonna catch them.",
      'If the fishing gets tough, fish less traveled spots.',
      'Bass like moving water for the oxygen levels. Spots near moving water that are also near weeds and weed beds are key fishing spots.',
      'Trout and related species are sight feeders and look up for food. Fish top half of the water column.',
      'Fixed Bobber: Pinch bobber onto the line, pinch a split shot between the bobber and hook, and add a wacky-rigged worm or a grub lure to the hook. Cast out, let the lure fall, then jerk it every few seconds to give it some action. Can also use plastic minnows or live bait of course',
      'Drop shot: Similar to bobber fishing, drop shot gets pinched at the end of the line but keeps the hook suspended above the bottom of the water, as opposed to from the top.',
      'Fish with live bait or soft plastics that have action like curly tail grubs, swim baits, and stick worms.',
      'Poppers and other noisy topwater lures: Cast out, let the water calm, then start to jerk/reel to generate the action. Start slow to prevent spooking the fish.',
      'Spoons, spinnerbaits, and spinners: Cast out, let the bait fall a bit, then jerk up and reel in to imitate fish.',
      'Crankbaits: Cast out, reel in to sink and generate motion and sound. You can also pull to crank up and wobble.',
      'Swimbaits and jerk baits: Cast out, let the bait fall a bit, then reel in to generate the action. Slow or speed up depending on the need. Can rig wacky for panfish.',
      'Plastic worms or creature baits: Can rig wacky, Ned, or Texas.',
      'The day before a storm is the best time to fish.',
    ]

    const today = new Date()
    let tipIndex = 0

    if (today.getDate() > tips.length) {
      tipIndex = today.getDate() - Math.trunc(today.getDate() / 10) * 10
    } else {
      tipIndex = today.getDate()
    }

    return tips[tipIndex]
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">What to Fish (Freshwater)</h1>
        <hr className="mb-4" />
        <p className="mb-4">
          To start, provide a ZIP, choose a State, or use your current location.
        </p>
        <div className="flex flex-col lg:flex-row justify-between lg:items-start">
          <div className="mb-4">
            <label htmlFor="zip" className="mb-4 block">
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
                setGeolocation('')
              }}
              className="text-slate-700 leading-4 p-2 mb-4"
            />
            <button
              onClick={getGeolocation}
              className="p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
            >
              Use Current Location
              <FontAwesomeIcon icon={faLocationCrosshairs} className="ml-2" />
            </button>
          </div>
          <div className="mb-4 lg:hidden">OR</div>
          <div className="mb-4">
            <label htmlFor="state" className="mb-4 block">
              State
            </label>
            <select
              name="state"
              id="state"
              onChange={(e) => {
                setZip('')
                setCityState(e.target.value)
                setGeolocation('')
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
        {loading && data.tackle.length == 0 && <Loader />}
        {data.tackle.length > 0 && (
          <div>
            <p className="mb-4">Data loaded for {data.weather.location}</p>
            <label htmlFor="useCurrentWeather" className="mb-4 block">
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
                  <p className="mb-4" key={t.name}>
                    {t.name}
                  </p>
                ))}
              ></ContentSection>
            </div>
            <div className="basis-4/12 shrink-0">
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
                    <p className="mb-4">
                      Outdoor Temperature: {data.weather.current.outdoorTemp}
                    </p>
                    <p className="mb-4">
                      Estimated Water Temperature:{' '}
                      {data.weather.current.waterTemp}
                    </p>
                    <p className="mb-4">
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
                    <p className="mb-4">
                      Outdoor Temperature: {data.weather.forecast.outdoorTemp}
                    </p>
                    <p className="mb-4">
                      Estimated Water Temperature:{' '}
                      {data.weather.forecast.waterTemp}
                    </p>
                    <p className="mb-4">
                      Conditions: {data.weather.forecast.conditions}
                    </p>
                    <p>Wind: {data.weather.forecast.wind}</p>
                  </div>
                }
              ></ContentSection>
            </div>
          </div>
        )}

        <div>
          <ContentSection
            title="Tip of the Day"
            content={getFishingTip()}
            isExpandedByDefault={true}
          ></ContentSection>
        </div>
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
