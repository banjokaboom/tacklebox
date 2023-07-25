'use client'

import { default as Logger } from 'pino'
import { useState, useEffect } from 'react'
import Loader from '@/app/components/loader'
import { getFreshwaterFishingData } from './useFreshwaterFishingData'
import { getSaltwaterFishingData } from './useSaltwaterFishingData'
import ContentSection from '@/app/components/content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import Message from '@/app/components/message'
import MessageData from '@/app/classes/MessageData'
import Breadcrumbs from '@/app/components/breadcrumbs'
import FishingData from '@/app/classes/FishingData'
import Tackle from '@/app/classes/Tackle'
import CityState from '@/app/classes/CityState'
import FishingDataContent from '@/app/components/fishingDataContent'

export default function WhatToFish() {
  let [zip, setZip] = useState('')
  let [cityState, setCityState] = useState('')
  let [waterType, setWaterType] = useState('freshwater')
  let [useCurrentWeather, setUseCurrentWeather] = useState(true)
  let [loading, setLoading] = useState(true)
  let [geolocation, setGeolocation] = useState('')
  let [data, setData] = useState(new FishingData())
  let [message, setMessage] = useState(new MessageData())
  let [tackleList, setTackleList] = useState<Tackle[]>([])
  let [cityStateList, setCityStateList] = useState<CityState[]>([])
  let breadcrumbs = [
    {
      title: 'Fishing',
      href: '/fishing',
    },
    {
      title: 'What to Fish',
      href: '/fishing/what-to-fish',
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
            setCityStateList(json.cityStates)
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
        let fishingData = new FishingData()

        if (waterType.includes('freshwater')) {
          fishingData = await getFreshwaterFishingData(
            zip,
            cityState,
            useCurrentWeather,
            tackleList,
            cityStateList,
            geolocation
          )
        } else {
          fishingData = await getSaltwaterFishingData(
            zip,
            cityState,
            useCurrentWeather,
            tackleList,
            cityStateList,
            geolocation
          )
        }

        setData(fishingData)

        if (fishingData.tackle.length > 0) {
          m.message =
            'Successfully loaded ' +
            waterType +
            ' tackle for location: ' +
            location
          m.severity = 'success'
        } else if (
          geolocation !== '' ||
          cityState != '' ||
          (zip != '' && zip.length == 5)
        ) {
          m.message =
            'No ' + waterType + ' tackle loaded for location: ' + location
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
    waterType,
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

  function getFishingTip() {
    const tips = [
      "When using a noisy lure, cast 5 to 10 times in the same spot before moving on. Even if a bass isn't hungry, annoying the bass is an equally efficient way to get a bite.",
      'Use colored baits that match the season, i.e. whites/silvers in winter, yellows/reds in summer.',
      'The day before a storm or similar major weather shift is the best time to fish. The day after is generally the worst.',
      'If the fishing gets tough, fish less traveled spots.',
      "If you're catching panfish left and right and then suddenly the bites stop, chances are a bigger predator just swam by. Time to bring out the big(ger) guns!",
      'Bass like moving water for the oxygen levels. Spots near moving water that are also near weeds and weed beds are key fishing spots.',
      'Drop shot: Similar to bobber fishing, drop shot gets pinched at the end of the line but keeps the hook suspended above the bottom of the water, as opposed to from the top. Fish with live bait or soft plastics that have action like curly tail grubs, swim baits, and stick worms.',
      'Crankbaits: Cast out, reel in to sink and generate motion and sound. You can also pull to crank up and wobble.',
      "If you gut hook a fish, absolutely try to dislodge it, but if you can't get it out through relatively easy means and within roughly 15 seconds, cut the line as close as you can to the fish's mouth and let the fish go. The hook will rust and deteriorate naturally, and the fish has a much greater chance for survival than if you continued to try and yank the hook out.",
      'Hook size correlates to fish size. Size #6 will cover most smaller fish, size #1 will cover most medium size fish, and size 2/0 will be good for bigger bass.',
      'Trout and related species are sight feeders and look up for food. Fish top half of the water column.',
      'To avoid gut-hooking a fish, watch your line carefully and set the hook as soon as you see a fish take the bait. Also, make sure you are using an appropriately-sized hook for the fish that you are targeting.',
      'Fixed Bobber: Pinch bobber onto the line, pinch a split shot between the bobber and hook, and add a wacky-rigged worm or a grub lure to the hook. Cast out, let the lure fall, then jerk it every few seconds to give it some action. Can also use plastic minnows or live bait of course',
      "If you're casting over and over and not getting any bites, try using a bobber or Carolina rig with some live bait just to see what's in the area. That may help to determine where to move next to find the bass.",
      "Don't forget: live bait moves on its own, but you need to make the action with lures and soft plastics.",
      'Plastic worms or creature baits: Can rig wacky, Ned, or Texas.',
      'Poppers and other noisy topwater lures: Cast out, let the water calm, then start to jerk/reel to generate the action. Start slow to prevent spooking the fish.',
      'Before you head out, decide if you want to land a big fish or just to catch whatever you can. If it is the latter, make sure to bring some nightcrawlers just in case.',
      "If fish are pecking at the bait and pulling it but aren't real heavy-feeling, they're little babies and you're not gonna catch them.",
      'Spoons, spinnerbaits, and spinners: Cast out, let the bait fall a bit, then jerk up and reel in to imitate fish.',
      'Swimbaits and jerk baits: Cast out, let the bait fall a bit, then reel in to generate the action. Slow or speed up depending on the need. Can rig wacky for panfish.',
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
        <h1 className="text-3xl mb-4">What to Fish</h1>
        <hr className="mb-4" />
        {data.weather.location == '' && !loading && (
          <div>
            <p className="mb-4">
              To start, provide a ZIP, choose a State, or use your current
              location.
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
                  className="text-slate-700 leading-4 p-2 mb-4 max-w-full"
                />
                <button
                  onClick={getGeolocation}
                  className="p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
                >
                  Use Current Location
                  <FontAwesomeIcon
                    icon={faLocationCrosshairs}
                    className="ml-2"
                  />
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
                      <option value="">Select State...</option>
                      {cityStateList.map(
                        (cs: CityState, csIndex) =>
                          (waterType.includes('freshwater') ||
                            cs.location.includes('east coast') ||
                            cs.location.includes('west coast') ||
                            cs.location.includes('gulf coast')) && (
                            <option
                              key={csIndex}
                              value={cs.capital + ',' + cs.state}
                            >
                              {cs.state}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {loading && <Loader />}
        {!loading && data.weather.location != '' && (
          <div className="mb-4">
            <p className="mb-4 flex flex-row">
              <span>Data loaded for {data.weather.location}</span>
              <button
                onClick={() => {
                  setData(new FishingData())
                }}
                className="ml-2 underline hover:no-underline text-sm"
              >
                Clear
              </button>
            </p>
            <div className="flex flex-col lg:flex-row justify-between lg:items-start">
              <div>
                <label htmlFor="waterType" className="mb-4 block">
                  Water Type?
                </label>
                <select
                  name="waterType"
                  id="waterType"
                  onChange={(e) => {
                    setWaterType(e.target.value)
                  }}
                  className="text-slate-700 leading-4 p-2 block max-w-full mb-4"
                  value={waterType}
                >
                  <option value="freshwater bank">Lake/Pond (Bank)</option>
                  <option value="freshwater boat">Lake/Pond (Boat)</option>
                  <option value="saltwater boat">Ocean (Boat)</option>
                  <option value="freshwater river">River</option>
                  <option value="saltwater bank">Surf</option>
                </select>
              </div>
              <div>
                <label htmlFor="useCurrentWeather" className="mb-4 block">
                  Use current weather or forecast?
                </label>
                <select
                  name="useCurrentWeather"
                  id="useCurrentWeather"
                  onChange={(e) => {
                    setUseCurrentWeather(e.target.value == 'true')
                  }}
                  className="text-slate-700 leading-4 p-2 block max-w-full mb-4"
                  value={'' + useCurrentWeather}
                >
                  <option value="true">Current</option>
                  <option value="false">Forecast</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {!loading && data.species !== '' && (
          <h2 className="text-3xl mb-4">
            {useCurrentWeather ? 'Current ' : "Today's "} conditions are{' '}
            {data.fishingConditions.conditionsText}
            <div className="text-sm">
              (
              {(data.fishingConditions.conditionsText !== 'Not Ideal'
                ? data.fishingConditions.positiveConditionsNotes
                : data.fishingConditions.negativeConditionsNotes
              ).map((note, fcIndex) => (
                <span key={note}>
                  {fcIndex !== 0 ? ', ' : ''}
                  {note}
                </span>
              ))}
              )
            </div>
          </h2>
        )}
        {!loading && data.species !== '' && <FishingDataContent data={data} />}

        <div>
          <ContentSection
            title="Tip of the Day"
            content={getFishingTip()}
            isExpandedByDefault={true}
          ></ContentSection>
        </div>

        {data.tackle.length > 0 && (
          <div className="pt-4">
            <p className="mb-4 text-sm">
              *Data is generalized for the location provided and is the result
              of experience on the water as well as my own research.
            </p>
            <p className="text-sm">
              **Condition quality is based on species availability and weather.
            </p>
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
