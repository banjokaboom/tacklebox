import * as tackleList from './tackle.json'

const waterTempMultiplier = 0.87

class FishingData {
  public baitRecommendations: BaitRecommendations
  public seasons: string
  public tackle: object[]
  public weather: WeatherData
}

class WeatherData {
  public outdoorTemp: string
  public waterTemp: string
  public conditions: string
  public wind: string
  public current: WeatherData
  public forecast: WeatherData
}

class BaitRecommendations {
  public colorsToUse: string
  public baitsToUse: string
}

async function getData() {
  let data = new FishingData()

  const weather = await getWeather()

  console.log('Weather received.')
  console.log(weather)

  data.baitRecommendations = pickBaitRecommendations(weather)
  data.seasons = getSeasons()
  data.tackle = await pickTackle(weather)
  data.weather = getWeatherValues(weather)

  return data
}

async function getWeather() {
  const res = await fetch(
    'http://api.weatherapi.com/v1/forecast.json?key=fbbd41244a6947eb83c182430231306&q=01516',
    { cache: 'no-store' }
  )

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function pickTackle(weather: WeatherData): Promise<object[]> {
  console.log('Tackle loaded.')
  console.log(JSON.stringify(tackleList))

  let tackleToUse: object[] = []

  tackleList.forEach(function (tackle) {
    console.log(tackle)

    if (isTackleForWeather(tackle, weather)) {
      tackleToUse.push(tackle)
    }
  })

  return tackleToUse
}

function pickBaitRecommendations(weather: any): BaitRecommendations {
  const seasons = getSeasons()
  let baitRecommendations = new BaitRecommendations()
  let colorsToUse: string[] = []
  let baitToUse: string[] = []

  baitToUse.push('live worms, soft plastic worms')

  if (seasons.includes('spring')) {
    colorsToUse.push('craw', 'orange', 'red')
    baitToUse.push('powerbait, soft plastic craws')
  } else {
    colorsToUse.push('shad', 'baitfish', 'white', 'blue')
    baitToUse.push(
      'soft plastic swimbaits, soft plastic flukes, soft plastic fish'
    )

    if (seasons.includes('summer')) {
      baitToUse.push('soft plastic frogs, soft plastic lizards')
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

function isTackleForWeather(tackle: any, weather: any): boolean {
  const seasons = getSeasons()
  let warmWaterMax = 75
  let warmWaterMin = 55
  let waterTemp =
    weather.forecast.forecastday[0].day.maxtemp_f * waterTempMultiplier

  if (
    seasons.includes('bass pre-spawn') ||
    seasons.includes('bass spawn') ||
    seasons.includes('fall')
  ) {
    console.log("It's growing season for bass! Bring out the reaction baits!")
    if (tackle.speed.includes('fast') || tackle.depth.includes('shallow')) {
      return true
    }
  }

  if (waterTemp >= warmWaterMax) {
    console.log('Water is very warm, need to fish deep and slow!')

    if (!tackle.waterTemp.includes('warm')) {
      return false
    }

    if (!tackle.depth.includes('deep')) {
      return false
    }
  } else if (waterTemp >= warmWaterMin) {
    console.log('Water temp is ideal for fishing most lures and rigs!')

    if (!tackle.waterTemp.includes('warm')) {
      return false
    }

    if (!tackle.depth.includes('shallow')) {
      return false
    }
  } else {
    console.log('Water temp is cold! At least for bass and most panfish.')

    if (!tackle.waterTemp.includes('cold')) {
      return false
    }

    if (!tackle.speed.includes('still') && !tackle.speed.includes('slow')) {
      return false
    }

    if (!tackle.depth.includes('deep')) {
      return false
    }
  }

  return true
}

function getSeasons(): string {
  let today = new Date()
  let todayMonth = today.getMonth() + 1
  let seasons: string[] = []

  switch (todayMonth) {
    case 1:
      seasons.push('winter')
      break
    case 2:
      seasons.push('winter')
      break
    case 3:
      seasons.push(today.getDate() > 21 ? 'spring' : 'winter')
      break
    case 4:
      seasons.push('spring')
      break
    case 5:
      seasons.push('spring')
      seasons.push('bass pre-spawn')
      break
    case 6:
      seasons.push(today.getDate() > 21 ? 'summer' : 'spring')
      seasons.push('bass spawn')
      seasons.push('sunfish pre-spawn')
      break
    case 7:
      seasons.push('summer')
      seasons.push('sunfish spawn')
      break
    case 8:
      seasons.push('summer')
      break
    case 9:
      seasons.push(today.getDate() > 21 ? 'fall' : 'summer')
      break
    case 10:
      seasons.push('fall')
      break
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

function getWeatherValues(weather): WeatherData {
  let data = new WeatherData()
  let current = new WeatherData()
  let forecast = new WeatherData()

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

  data.current = current
  data.forecast = forecast

  return data
}

export default async function WhatToFish() {
  const data = await getData()

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl">What to Fish</h1>
        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-2xl pb-8 pt-8">
              Lures, Rigs, and Bait to use today
            </h2>
            <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
              {data.tackle.map((t) => (
                <p className="pb-4 last:pb-0" key={t.name}>
                  {t.name}
                </p>
              ))}
            </div>

            <h2 className="text-2xl pb-8 pt-8">Lure Colors to use now</h2>
            <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
              <p>{data.baitRecommendations.colorsToUse}</p>
            </div>

            <h2 className="text-2xl pb-8 pt-8">Baits to use now</h2>
            <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
              <p>{data.baitRecommendations.baitsToUse}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl pb-8 pt-8">Season</h2>
            <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
              <p>{data.seasons}</p>
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
      </div>
    </div>
  )
}
