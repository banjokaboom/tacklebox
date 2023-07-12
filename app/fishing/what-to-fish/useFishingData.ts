import Tackle from '@/app/classes/Tackle'
import CityState from '@/app/classes/CityState'
import WeatherData from '@/app/classes/WeatherData'
import BaitRecommendations from '@/app/classes/BaitRecommendations'
import WeatherDataChild from '@/app/classes/WeatherDataChild'
import FishingData from '@/app/classes/FishingData'
import { getSeasons } from '@/app/helpers/date'
import AstroData from '@/app/classes/AstroData'

const waterTempMultiplier = 0.87
const warmWaterMax = 82.5
const warmWaterMin = 57.5

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

function pickBaitRecommendations(
  weather: any,
  species: string,
  seasons: string
): BaitRecommendations {
  let baitRecommendations = new BaitRecommendations()
  let colorsToUse: string[] = []
  let baitToUse: string[] = []

  baitToUse.push('live worms, soft plastic worms')

  if (species.includes('catfish')) {
    baitToUse.push('stinky bait')
  }

  if (species.includes('carp')) {
    baitToUse.push('corn', 'bread')
  }

  if (seasons.includes('spring')) {
    if (
      species.includes('largemouth bass') ||
      species.includes('smallmouth bass') ||
      species.includes('catfish')
    ) {
      colorsToUse.push('craw')
      baitToUse.push('soft plastic craws')
    }
    colorsToUse.push('orange')
    baitToUse.push('powerbait', 'soft plastic insects')
  }

  if (
    seasons.includes('summer') ||
    seasons.includes('fall') ||
    seasons.includes('winter')
  ) {
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

  if (weather.current.cloud >= 75 || seasons.includes('spring')) {
    colorsToUse.push('red')
  }

  if (weather.current.cloud >= 75) {
    colorsToUse.push('dark', 'black')
    if (!colorsToUse.includes('blue')) {
      colorsToUse.push('blue')
    }
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
    if (tackle.type.includes('reaction') && tackle.depth.includes('shallow')) {
      return true
    }
  }

  if (tackle.type.includes('still')) {
    return true
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

    if (!tackle.type.includes('finesse')) {
      return false
    }

    if (!tackle.depth.includes('deep')) {
      return false
    }
  }

  return true
}

function getFishingSeasons(
  weather: any,
  cityStateString: string,
  cityStateList: CityState[]
): string {
  let today = new Date()
  let todayMonth = today.getMonth() + 1
  let seasons: string[] = getSeasons()
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
    case 3:
      if (cityState && cityState.location.includes('north')) {
        seasons.push('trout stocking')
      }
      if (cityState && cityState.location.includes('south')) {
        seasons.push('bass pre-spawn')
        seasons.push('sunfish pre-spawn')
        seasons.push('pickerel/pike/muskies pre-spawn')
      }
      break
    case 4:
      if (cityState && cityState.location.includes('north')) {
        seasons.push('trout stocking')
      }
      if (cityState && cityState.location.includes('mid')) {
        seasons.push('bass pre-spawn')
        seasons.push('sunfish pre-spawn')
        seasons.push('pickerel/pike/muskies pre-spawn')
      }
      if (cityState && cityState.location.includes('south')) {
        seasons.push('carp pre-spawn')
        seasons.push('bass spawn')
        seasons.push('sunfish spawn')
        seasons.push('pickerel/pike/muskies spawn')
      }
      break
    case 5:
      if (cityState && cityState.location.includes('north')) {
        seasons.push('bass pre-spawn')
        seasons.push('sunfish pre-spawn')
        seasons.push('pickerel/pike/muskies pre-spawn')
      }
      if (cityState && cityState.location.includes('mid')) {
        seasons.push('carp pre-spawn')
        seasons.push('bass spawn')
        seasons.push('sunfish spawn')
        seasons.push('pickerel/pike/muskies spawn')
      }
      if (cityState && cityState.location.includes('south')) {
        seasons.push('catfish pre-spawn')
        seasons.push('carp spawn')
      }
      break
    case 6:
      if (cityState && cityState.location.includes('north')) {
        seasons.push('carp pre-spawn')
        seasons.push('bass spawn')
        seasons.push('sunfish spawn')
        seasons.push('pickerel/pike/muskies spawn')
      }
      if (cityState && cityState.location.includes('mid')) {
        seasons.push('catfish pre-spawn')
        seasons.push('carp spawn')
      }
      if (cityState && cityState.location.includes('south')) {
        seasons.push('catfish spawn')
      }
      break
    case 7:
      if (cityState && cityState.location.includes('north')) {
        seasons.push('catfish pre-spawn')
        seasons.push('carp spawn')
      }
      if (cityState && cityState.location.includes('mid')) {
        seasons.push('catfish spawn')
      }
      break
    case 8:
      if (cityState && cityState.location.includes('north')) {
        seasons.push('catfish spawn')
      }
      break
    case 10:
    case 11:
      if (cityState && cityState.location.includes('north')) {
        seasons.push('trout stocking')
      }
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
  let astro = new AstroData()

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

  astro.sunrise = weather.forecast.forecastday[0].astro.sunrise
  astro.sunset = weather.forecast.forecastday[0].astro.sunset
  astro.moonrise = weather.forecast.forecastday[0].astro.moonrise
  astro.moonset = weather.forecast.forecastday[0].astro.moonset
  astro.moon_phase = weather.forecast.forecastday[0].astro.moon_phase

  weatherData.current = current
  weatherData.forecast = forecast
  weatherData.location = weather.location.name + ', ' + weather.location.region
  weatherData.pressure = weather.current.pressure_in
  weatherData.astro = astro

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
    fishingData.seasons = getFishingSeasons(weather, cityState, cityStateList)
    fishingData.weather = getWeatherValues(weather)

    const waterTemp = useCurrentWeather
      ? parseFloat(fishingData.weather.current.waterTemp)
      : parseFloat(fishingData.weather.forecast.waterTemp)

    fishingData.species = getSpecies(waterTemp, fishingData.seasons)
    fishingData.baitRecommendations = pickBaitRecommendations(
      weather,
      fishingData.species,
      fishingData.seasons
    )
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

function getSpecies(waterTemp: number, seasons: string): string {
  let species = ''

  if (waterTemp >= 31.5 && waterTemp <= 82.5) {
    if (waterTemp >= 60) {
      species += 'largemouth bass, catfish, '
    }

    if (waterTemp >= 47.5 && waterTemp <= 72.5) {
      species += 'smallmouth bass, carp, '
    }

    if (waterTemp > 61.5) {
      species += 'sunfish, '
    }

    if (!seasons.includes('summer') && waterTemp <= 66.5) {
      species += 'trout, '
    }

    species += 'pickerel/pike/muskies'
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

  if (weather.current.pressure_in < 29.8) {
    starRating += '++'
  } else if (
    weather.current.pressure_in >= 29.8 &&
    weather.current.pressure_in <= 30.2
  ) {
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
