'use client'

import { default as Logger } from 'pino'
import { useState, useEffect } from 'react'
import Loader from '@/app/components/loader'
import { getFishingData } from './useFishingData'
import ContentSection from '@/app/components/content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import Message from '@/app/components/message'
import MessageData from '@/app/classes/MessageData'
import Breadcrumbs from '@/app/components/breadcrumbs'
import Tackle from '@/app/classes/Tackle'
import FishingData from '@/app/classes/FishingData'
import CityState from '@/app/classes/CityState'
import Modal from 'react-modal'
import ReactHtmlParser from 'react-html-parser'

export default function WhatToFish() {
  let [zip, setZip] = useState('')
  let [cityState, setCityState] = useState('')
  let [useCurrentWeather, setUseCurrentWeather] = useState(true)
  let [loading, setLoading] = useState(true)
  let [geolocation, setGeolocation] = useState('')
  let [data, setData] = useState(new FishingData())
  let [message, setMessage] = useState(new MessageData())
  let [tackleList, setTackleList] = useState<Tackle[]>([])
  let [cityStateList, setCityStateList] = useState<CityState[]>([])
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [modalContent, setModalContent] = useState('')
  let breadcrumbs = [
    {
      title: 'Fishing',
      href: '/fishing',
    },
    {
      title: 'What to Fish (Saltwater)',
      href: '/fishing/what-to-fish-salt',
    },
  ]

  useEffect(() => {
    const logger = Logger({})
    setLoading(true)

    let m = new MessageData()
    setMessage(new MessageData())

    async function getData() {
      if (isDataLoaded) {
        return
      }

      try {
        await fetch('/api/tackle')
          .then((res) => res.json())
          .then((json) => {
            setTackleList(json.tackle)
          })
      } catch (error: any) {
        logger.error(error)
        m.message =
          'An error occurred when loading the tackle list. Please refresh the page to try again.'
        m.severity = 'error'
        setMessage(m)
      }

      try {
        await fetch('/api/cityStates')
          .then((res) => res.json())
          .then((json) => {
            let filteredArray: CityState[] = []

            json.cityStates.forEach((cs: CityState) => {
              if (
                cs.location.includes('east coast') ||
                cs.location.includes('west coast') ||
                cs.location.includes('gulf coast')
              ) {
                filteredArray.push(cs)
              }
            })
            setCityStateList(filteredArray)
          })
      } catch (error) {
        logger.error(error)
        m.message =
          'An error occurred when loading the city/state list. Please try refreshing the page.'
        m.severity = 'error'
        setMessage(m)
      }

      setLoading(false)
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [])

  useEffect(() => {
    setLoading(true)

    const location =
      geolocation !== '' ? geolocation : cityState !== '' ? cityState : zip
    let m = new MessageData()
    setMessage(new MessageData())

    async function getData() {
      if (isDataLoaded || tackleList.length == 0 || cityStateList.length == 0) {
        return
      }

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

        setData(fishingData)

        if (fishingData.tackle.length > 0) {
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
    geolocation,
    tackleList,
    cityStateList,
  ])

  function getGeolocation() {
    const logger = Logger({})
    setZip('')
    setCityState('')
    setGeolocation('')
    setLoading(true)

    if (navigator.geolocation) {
      logger.info('Using geolocation')
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation(
          position.coords.latitude + ',' + position.coords.longitude
        )
      })
    } else {
      logger.info('Geolocation is not available')
    }
  }

  function getTackleSpecies(tackle: Tackle) {
    let tackleSpeciesStr = '('

    tackle.species.forEach((s) => {
      if (data.species.includes(s)) {
        tackleSpeciesStr += (tackleSpeciesStr.length > 1 ? ', ' : '') + s
      }
    })

    tackleSpeciesStr += ')'

    return tackleSpeciesStr
  }

  function getFishingTip() {
    const tips = [
      'Use colored baits that match the season, i.e. whites/silvers in winter, yellows/reds in summer.',
      'Hook size correlates to fish size. Size 1/0 will cover most smaller fish, size 4/0 will cover most medium size fish, and size 8/0 will be good for bigger hauls.',
      'The day before a storm is the best time to fish.',
    ]

    const today = new Date()
    let tipIndex = 0

    if (today.getDate() > tips.length) {
      tipIndex = today.getDate() - Math.trunc(today.getDate() / 10) * 10
    } else {
      tipIndex = today.getDate()
    }

    while (tipIndex >= tips.length) {
      tipIndex--
    }

    return tips[tipIndex]
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">What to Fish (Saltwater)</h1>
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
          {cityStateList.length > 0 && (
            <div>
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
                  {cityStateList.map((cs: CityState, csIndex) => (
                    <option key={csIndex} value={cs.capital + ',' + cs.state}>
                      {cs.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        {loading && <Loader />}
        {!loading && data.weather.location != '' && (
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
        {!loading && data.species !== '' && (
          <div className="flex flex-col lg:flex-row justify-between lg:space-x-8">
            <div>
              <ContentSection
                title="Species to target"
                content={data.species}
                isExpandedByDefault={data.tackle.length == 0}
              ></ContentSection>

              {data.tackle.length > 0 && (
                <ContentSection
                  title="Baits to use now"
                  content={data.baitRecommendations.baitsToUse}
                ></ContentSection>
              )}

              {data.tackle.length > 0 && (
                <ContentSection
                  title="Lures and rigs to use today"
                  content={data.tackle.map((t, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      {t.tip && (
                        <button
                          className="flex flex-row items-center"
                          title="Click to learn how to use this"
                          onClick={() => {
                            setModalContent(t.tip)
                            setIsModalOpen(true)
                          }}
                        >
                          {t.name}
                          <FontAwesomeIcon
                            icon={faCircleQuestion}
                            className="ml-2"
                          />
                        </button>
                      )}
                      {!t.tip && <p>{t.name}</p>}
                      <p className="text-sm">{getTackleSpecies(t)}</p>
                    </div>
                  ))}
                ></ContentSection>
              )}
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
                      {!data.seasons.includes('summer') &&
                      !data.seasons.includes('winter')
                        ? 'early morning'
                        : 'late morning/early afternoon'}
                    </p>
                    <p>
                      Good:{' '}
                      {!data.seasons.includes('summer') &&
                      !data.seasons.includes('winter')
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

        {data.tackle.length > 0 && (
          <p className="pt-4 mb-4 text-sm">
            *Data is generalized for the location provided and is the result of
            experience on the water as well as my own research.
          </p>
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

      <Modal isOpen={isModalOpen} contentLabel="Tackle Modal">
        <div className="text-slate-700 mb-4">
          {ReactHtmlParser(modalContent)}
        </div>
        <button
          className="p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md"
          onClick={() => {
            setIsModalOpen(false)
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  )
}
