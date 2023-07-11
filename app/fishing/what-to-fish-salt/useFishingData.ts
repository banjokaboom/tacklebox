import Tackle from '@/app/classes/Tackle'
import CityState from '@/app/classes/CityState'
import WeatherData from '@/app/classes/WeatherData'
import BaitRecommendations from '@/app/classes/BaitRecommendations'
import WeatherDataChild from '@/app/classes/WeatherDataChild'
import FishingData from '@/app/classes/FishingData'
import { getSeasons } from '@/app/helpers/date'

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
  console.log('tackle is ' + tackle.name)
  console.log('seasons are ' + seasons)
  console.log('water temp is estimated to be ' + waterTemp)

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
