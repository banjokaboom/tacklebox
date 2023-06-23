'use client'

import * as tackleJSON from './tackle.js'
import * as cityStateJSON from './cityStates.js'
import { useState, useEffect, useMemo } from 'react'
import Loader from '../../components/loader'

class Tackle {
  public name: string
  public species: string[]
  public waterTemp: string[]
  public type: string[]
  public depth: string[]

  constructor() {
    this.name = ''
    this.species = []
    this.waterTemp = []
    this.type = []
    this.depth = []
  }
}
class CityState {
  public state: string
  public capital: string
  public location: string[]

  constructor() {
    this.state = ''
    this.capital = ''
    this.location = []
  }
}

class WeatherData {
  public outdoorTemp: string
  public waterTemp: string
  public conditions: string
  public wind: string
  public location: string
  public current: WeatherDataChild
  public forecast: WeatherDataChild

  constructor() {
    this.outdoorTemp = ''
    this.waterTemp = ''
    this.conditions = ''
    this.wind = ''
    this.location = ''
    this.current = new WeatherDataChild()
    this.forecast = new WeatherDataChild()
  }
}

class WeatherDataChild {
  public outdoorTemp: string
  public waterTemp: string
  public conditions: string
  public wind: string

  constructor() {
    this.outdoorTemp = ''
    this.waterTemp = ''
    this.conditions = ''
    this.wind = ''
  }
}

class BaitRecommendations {
  public colorsToUse: string
  public baitsToUse: string

  constructor() {
    this.colorsToUse = ''
    this.baitsToUse = ''
  }
}

class FishingData {
  public baitRecommendations: BaitRecommendations
  public seasons: string
  public tackle: Tackle[]
  public weather: WeatherData
  public species: string

  constructor() {
    this.baitRecommendations = new BaitRecommendations()
    this.seasons = ''
    this.tackle = []
    this.weather = new WeatherData()
    this.species = ''
  }
}

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
    const waterTempMultiplier = 0.87
    const warmWaterMax = 80
    const warmWaterMin = 60

    async function getWeather(zip: string, cityState: string) {
      if (cityState == '' && (!zip || zip.length !== 5)) {
        return
      }
      let query = cityState !== '' ? cityState : zip
      const res = await fetch(
        'http://api.weatherapi.com/v1/forecast.json?key=fbbd41244a6947eb83c182430231306&q=' +
          query,
        { cache: 'no-store' }
      )

      return res.json()
    }

    async function pickTackle(
      seasons: string,
      species: string[],
      waterTemp: number
    ): Promise<Tackle[]> {
      console.log('Tackle loaded.')

      let tackleToUse: Tackle[] = []

      tackleList.forEach(function (tackle: Tackle) {
        let isTackleForSpecies = false

        for (
          let speciesIndex = 0;
          speciesIndex < tackle.species.length;
          speciesIndex++
        ) {
          if (species.includes(tackle.species[speciesIndex])) {
            isTackleForSpecies = true
            break
          }
        }

        if (
          isTackleForSpecies &&
          isTackleForWeather(tackle, seasons, waterTemp)
        ) {
          tackleToUse.push(tackle)
        }
      })

      return tackleToUse
    }

    function pickBaitRecommendations(
      weather: any,
      cityState: string,
      species: string[]
    ): BaitRecommendations {
      const seasons = getSeasons(weather, cityState)
      let baitRecommendations = new BaitRecommendations()
      let colorsToUse: string[] = []
      let baitToUse: string[] = []

      baitToUse.push('live worms, soft plastic worms')

      if (seasons.includes('spring')) {
        if (
          species.includes('largemouth bass') ||
          species.includes('smallmouth bass')
        ) {
          colorsToUse.push('craw')
          baitToUse.push('soft plastic craws')
        }
        colorsToUse.push('orange', 'red')
        baitToUse.push('powerbait', 'soft plastic insects')
      } else {
        colorsToUse.push('shad', 'baitfish', 'white', 'blue')
        baitToUse.push('soft plastic swimbaits', 'shiners')

        if (seasons.includes('summer')) {
          if (species.includes('largemouth bass')) {
            baitToUse.push('soft plastic frogs', 'soft plastic lizards')
          }
        } else {
          baitToUse.push('powerbait')
        }
      }

      if (weather.current.cloud >= 75) {
        colorsToUse.push('bright', 'yellow', 'pink')
      } else {
        colorsToUse.push('natural', 'gold', 'silver', 'green')
      }

      let colorString = ''

      colorsToUse.forEach(function (color, index) {
        colorString += color
        if (index < colorsToUse.length - 1) {
          colorString += ', '
        }
      })

      let baitString = ''

      baitToUse.forEach(function (color, index) {
        baitString += color
        if (index < baitToUse.length - 1) {
          baitString += ', '
        }
      })

      baitRecommendations.colorsToUse = colorString
      baitRecommendations.baitsToUse = baitString

      return baitRecommendations
    }

    function isTackleForWeather(
      tackle: Tackle,
      seasons: string,
      waterTemp: number
    ): boolean {
      if (
        seasons.includes('bass pre-spawn') ||
        seasons.includes('bass spawn') ||
        seasons.includes('fall')
      ) {
        if (
          tackle.type.includes('reaction') &&
          tackle.depth.includes('shallow')
        ) {
          return true
        }
      }

      if (waterTemp > warmWaterMax) {
        if (!tackle.waterTemp.includes('warm')) {
          return false
        }

        if (!tackle.depth.includes('deep')) {
          return false
        }
      } else if (waterTemp > warmWaterMin) {
        if (!tackle.waterTemp.includes('warm')) {
          return false
        }

        if (!tackle.depth.includes('shallow')) {
          return false
        }
      } else {
        if (!tackle.waterTemp.includes('cold')) {
          return false
        }

        if (
          !tackle.type.includes('still') &&
          !tackle.type.includes('finesse')
        ) {
          return false
        }

        if (!tackle.depth.includes('deep')) {
          return false
        }
      }

      return true
    }

    function getSeasons(weather: any, cityStateString: string): string {
      let today = new Date()
      let todayMonth = today.getMonth() + 1
      let seasons: string[] = []
      let state = ''
      let cityState: CityState | undefined = new CityState()

      if (cityStateString && cityStateString !== '') {
        state = cityStateString.split(',')[1]
      } else {
        state = weather.location.region
      }

      cityState = cityStateList.find((cs) => {
        return cs.state == state
      })

      switch (todayMonth) {
        case 1:
        case 2:
          seasons.push('winter')
          break
        case 3:
          seasons.push(today.getDate() > 21 ? 'spring' : 'winter')
          if (cityState && cityState.location.includes('south')) {
            seasons.push('bass pre-spawn')
            seasons.push('sunfish pre-spawn')
          }
          break
        case 4:
          seasons.push('spring')
          if (cityState && cityState.location.includes('mid')) {
            seasons.push('bass pre-spawn')
            seasons.push('sunfish pre-spawn')
          }
          if (cityState && cityState.location.includes('south')) {
            seasons.push('bass spawn')
            seasons.push('sunfish spawn')
          }
          break
        case 5:
          seasons.push('spring')
          if (cityState && cityState.location.includes('north')) {
            seasons.push('bass pre-spawn')
            seasons.push('sunfish pre-spawn')
          }
          if (cityState && cityState.location.includes('mid')) {
            seasons.push('bass spawn')
            seasons.push('sunfish spawn')
          }
          break
        case 6:
          seasons.push(today.getDate() > 21 ? 'summer' : 'spring')
          if (cityState && cityState.location.includes('north')) {
            seasons.push('bass spawn')
            seasons.push('sunfish spawn')
          }
          break
        case 7:
        case 8:
          seasons.push('summer')
          break
        case 9:
          seasons.push(today.getDate() > 21 ? 'fall' : 'summer')
          break
        case 10:
        case 11:
          seasons.push('fall')
          break
        case 12:
          seasons.push(today.getDate() > 21 ? 'winter' : 'fall')
          break
        default:
          break
      }

      let seasonString = ''

      seasons.forEach(function (season, index) {
        seasonString += season
        if (index < seasons.length - 1) {
          seasonString += ', '
        }
      })

      return seasonString
    }

    function getWeatherValues(weather: any): WeatherData {
      let weatherData = new WeatherData()
      let current = new WeatherDataChild()
      let forecast = new WeatherDataChild()

      current.outdoorTemp = weather.current.temp_f + 'F'
      current.waterTemp =
        (weather.current.feelslike_f * waterTempMultiplier).toFixed(0) + 'F'
      current.conditions = weather.current.condition.text
      current.wind = weather.current.wind_mph + 'mph'

      forecast.outdoorTemp = weather.forecast.forecastday[0].day.maxtemp_f + 'F'
      forecast.waterTemp =
        (
          weather.forecast.forecastday[0].day.maxtemp_f * waterTempMultiplier
        ).toFixed(0) + 'F'
      forecast.conditions = weather.forecast.forecastday[0].day.condition.text
      forecast.wind = weather.forecast.forecastday[0].day.maxwind_mph + 'mph'

      weatherData.current = current
      weatherData.forecast = forecast
      weatherData.location =
        weather.location.name + ', ' + weather.location.region

      return weatherData
    }

    async function getData(zip: string, cityState: string) {
      setData(new FishingData())
      let fishingData = new FishingData()

      const weather = await getWeather(zip, cityState)

      if (weather) {
        console.log('Weather received.')

        fishingData.seasons = getSeasons(weather, cityState)
        fishingData.weather = getWeatherValues(weather)

        const waterTemp = useCurrentWeather
          ? parseFloat(fishingData.weather.current.waterTemp)
          : parseFloat(fishingData.weather.forecast.waterTemp)

        if (
          fishingData.seasons.includes('bass pre-spawn') ||
          fishingData.seasons.includes('bass spawn') ||
          fishingData.seasons.includes('fall')
        ) {
          console.log(
            "It's growing season for bass! Bring out the reaction baits!"
          )
        }

        if (waterTemp > warmWaterMax) {
          console.log('Water is very warm, need to fish deep and slow!')
        } else if (waterTemp > warmWaterMin) {
          console.log('Water temp is ideal for fishing most lures and rigs!')
        } else {
          console.log('Water temp is cold! At least for bass and most panfish.')
        }

        fishingData.species = getSpecies(waterTemp)
        fishingData.baitRecommendations = pickBaitRecommendations(
          weather,
          cityState,
          fishingData.species.split(',')
        )
        fishingData.tackle = await pickTackle(
          fishingData.seasons,
          fishingData.species.split(','),
          waterTemp
        )

        if (!isDataLoaded) {
          setData(fishingData)
        }
      }
    }

    let isDataLoaded = false

    getData(zip, cityState)

    return () => {
      isDataLoaded = true
    }
  }, [zip, tackleList, cityState, cityStateList, useCurrentWeather])

  function getSpecies(waterTemp: number): string {
    let species = ''

    if (waterTemp >= 34 && waterTemp <= 80) {
      if (waterTemp >= 60) {
        species += 'largemouth bass, catfish, '
      }

      if (waterTemp >= 50 && waterTemp <= 70) {
        species += 'smallmouth bass, carp, '
      }

      if (waterTemp > 64) {
        species += 'sunfish, '
      } else {
        species += 'trout, '
      }

      species += 'pickerel/pike/muskies'
    }

    return species !== ''
      ? species
      : 'Not ideal fishing weather for any species'
  }

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
