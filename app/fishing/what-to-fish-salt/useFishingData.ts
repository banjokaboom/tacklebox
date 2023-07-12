import { default as Logger } from 'pino'
import Tackle from '@/app/classes/Tackle'
import CityState from '@/app/classes/CityState'
import WeatherData from '@/app/classes/WeatherData'
import BaitRecommendations from '@/app/classes/BaitRecommendations'
import WeatherDataChild from '@/app/classes/WeatherDataChild'
import FishingData from '@/app/classes/FishingData'
import { getSeasons } from '@/app/helpers/date'

const logger = Logger({})
const waterTempMultiplier = 0.875

async function getWeather(zip: string, cityState: string, geolocation: string) {
  let query = ''

  if (geolocation == '' && cityState == '' && (!zip || zip.length !== 5)) {
    return
  }

  if (geolocation !== '') {
    query = geolocation
  } else if (cityState !== '') {
    query = cityState
  } else {
    query = zip
  }

  if (query !== '') {
    const res = await fetch('/api/weather?q=' + query, { cache: 'no-store' })

    return res.json()
  }

  return
}

function pickTackle(
  tackleList: Tackle[],
  seasons: string,
  species: string,
  waterTemp: number
): Tackle[] {
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

    if (isTackleForSpecies && isTackleForWeather(tackle, seasons, waterTemp)) {
      tackleToUse.push(tackle)
    }
  })

  tackleToUse.sort((a, b) => {
    if (a.confidence < b.confidence) {
      return 1
    }
    if (a.confidence > b.confidence) {
      return -1
    }
    // a must be equal to b
    return 0
  })

  return tackleToUse
}

function pickBaitRecommendations(): BaitRecommendations {
  let baitRecommendations = new BaitRecommendations()
  let colorsToUse: string[] = []
  let baitToUse: string[] = []

  baitToUse.push('live sand worms', 'shrimp', 'squid', 'crab')

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
  logger.info('tackle is ' + tackle.name)
  logger.info('seasons are ' + seasons)
  logger.info('water temp is estimated to be ' + waterTemp)

  return true
}

function getFishingSeasons(): string {
  let seasons: string[] = getSeasons()

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
  weatherData.location = weather.location.name + ', ' + weather.location.region

  return weatherData
}

export async function getFishingData(
  zip: string,
  cityState: string,
  useCurrentWeather: boolean,
  tackleList: Tackle[],
  cityStateList: CityState[],
  geolocation: string
): Promise<FishingData> {
  let fishingData = new FishingData()

  const weather = await getWeather(zip, cityState, geolocation)
  const location =
    geolocation !== '' ? geolocation : cityState !== '' ? cityState : zip

  if (location == '') {
    return fishingData
  }

  if (weather && weather.location) {
    fishingData.seasons = getFishingSeasons()
    fishingData.weather = getWeatherValues(weather)

    const waterTemp = useCurrentWeather
      ? parseFloat(fishingData.weather.current.waterTemp)
      : parseFloat(fishingData.weather.forecast.waterTemp)

    fishingData.species = getSpecies(waterTemp)
    fishingData.baitRecommendations = pickBaitRecommendations()
    fishingData.tackle = await pickTackle(
      tackleList,
      fishingData.seasons,
      fishingData.species,
      waterTemp
    )

    fishingData.fishingConditionsText = getFishingConditionsText(
      weather,
      fishingData.species,
      fishingData.seasons,
      useCurrentWeather
    )
  } else if (
    geolocation !== '' ||
    cityState != '' ||
    (zip != '' && zip.length == 5)
  ) {
    throw 'Unable to load weather for location: ' + location
  }

  return fishingData
}

function getSpecies(waterTemp: number): string {
  let species = ''

  if (waterTemp >= 31.5 && waterTemp <= 82.5) {
    species +=
      'shark, drum, striped bass, bluefish, cod, snook, black sea bass, haddock, halibut, mackerel, scup, tautog, flounder'
  }

  return species !== '' ? species : 'Not ideal fishing weather for any species'
}

function getFishingConditionsText(
  weather: any,
  species: string,
  seasons: string,
  useCurrentWeather: boolean
) {
  let fishingConditionsText = ''
  let starRating = ''
  const speciesArray = species.split(',').map((s) => s.trim())

  if (speciesArray.length >= 5) {
    fishingConditionsText += 'Best'
  } else if (speciesArray.length >= 3) {
    fishingConditionsText += 'Good'
  } else if (speciesArray.length == 1) {
    fishingConditionsText += 'Not Ideal'
  } else {
    fishingConditionsText += 'OK'
  }

  if (useCurrentWeather) {
    if (weather.current.wind_mph < 6) {
      starRating += '+++'
    } else if (weather.current.wind_mph < 10) {
      starRating += '++'
    } else if (weather.current.wind_mph < 13) {
      starRating += '+'
    }
  } else {
    if (weather.forecast.forecastday[0].day.maxwind_mph < 6) {
      starRating += '+++'
    } else if (weather.forecast.forecastday[0].day.maxwind_mph < 10) {
      starRating += '++'
    } else if (weather.forecast.forecastday[0].day.maxwind_mph < 13) {
      starRating += '+'
    }
  }

  if (weather.forecast.forecastday[0].day.daily_chance_of_rain <= 50) {
    starRating += '+'
  }

  if (weather.current.cloud == 100) {
    starRating += '+++'
  } else if (weather.current.cloud >= 75) {
    starRating += '++'
  } else if (weather.current.cloud >= 50) {
    starRating += '+'
  }

  const now = new Date()
  let sunrise = new Date()
  sunrise.setHours(
    weather.forecast.forecastday[0].astro.sunrise.substring(0, 2)
  )
  sunrise.setMinutes(
    weather.forecast.forecastday[0].astro.sunrise.substring(3, 5)
  )
  let sunset = new Date()
  sunset.setHours(weather.forecast.forecastday[0].astro.sunset.substring(0, 2))
  sunset.setMinutes(
    weather.forecast.forecastday[0].astro.sunset.substring(3, 5)
  )

  if (sunset.getHours() - now.getHours() <= 3) {
    starRating += '++'
  } else if (
    (seasons.includes('summer') || seasons.includes('winter')) &&
    now.getHours() - sunrise.getHours() <= 3
  ) {
    starRating += '+'
  } else if (
    !seasons.includes('summer') &&
    !seasons.includes('winter') &&
    now.getHours() - sunrise.getHours() <= 3
  ) {
    starRating += '+'
  }

  return fishingConditionsText + starRating
}
