import Tackle from '../classes/Tackle'
import WeatherData from '../classes/WeatherData'
import WeatherDataChild from '../classes/WeatherDataChild'
import AstroData from '../classes/AstroData'

const waterTempMultiplier = 0.875
const warmWaterMax = 82.5
const warmWaterMin = 57.5

export function getFishingConditionsText(
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

  if (weather.current.pressure_in < 29.8) {
    starRating += '++'
  } else if (
    weather.current.pressure_in >= 29.8 &&
    weather.current.pressure_in <= 30.2
  ) {
    starRating += '+'
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

export async function getWeather(
  zip: string,
  cityState: string,
  geolocation: string
) {
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

export function pickTackle(
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

export function isTackleForWeather(
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

export function getWeatherValues(weather: any): WeatherData {
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
