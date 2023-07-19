import Tackle from '../classes/Tackle'
import WeatherData from '../classes/WeatherData'
import WeatherDataChild from '../classes/WeatherDataChild'
import AstroData from '../classes/AstroData'
import FishingConditions from '../classes/FishingConditions'

const waterTempMultiplier = 0.875
const warmWaterMax = 82.5
const warmWaterMin = 57.5

export function getFishingConditions(
  weather: any,
  species: string,
  seasons: string,
  useCurrentWeather: boolean
) {
  let fishingConditionsText: string = ''
  let fishingConditionsNotes: string[] = []
  let starRating = 0
  const speciesArray = species.split(',').map((s) => s.trim())
  let fishingConditions = new FishingConditions()

  if (speciesArray.length >= 8) {
    fishingConditionsText += 'Excellent'
    fishingConditionsNotes.push('at least 8 active species')
  } else if (speciesArray.length > 6) {
    fishingConditionsText += 'Really Good'
    fishingConditionsNotes.push('several active species')
  } else if (speciesArray.length > 3) {
    fishingConditionsText += 'Good'
    fishingConditionsNotes.push('more than 3 active species')
  } else if (speciesArray.length == 1) {
    fishingConditionsText += 'Not Ideal'
    fishingConditionsNotes.push('no active species')
  } else {
    fishingConditionsText += 'OK'
    fishingConditionsNotes.push('a few active species')
  }

  const now = new Date()
  let sunrise = new Date()
  sunrise.setHours(
    parseInt(weather.forecast.forecastday[0].astro.sunrise.substring(0, 2))
  )
  sunrise.setMinutes(
    weather.forecast.forecastday[0].astro.sunrise.substring(3, 5)
  )
  let sunset = new Date()
  sunset.setHours(
    parseInt(weather.forecast.forecastday[0].astro.sunset.substring(0, 2)) + 12
  )
  sunset.setMinutes(
    weather.forecast.forecastday[0].astro.sunset.substring(3, 5)
  )

  if (
    sunset.getHours() - now.getHours() <= 3 &&
    sunset.getHours() - now.getHours() > 0
  ) {
    starRating += 2
    fishingConditionsNotes.push('within the last three hours until sunset')
  } else if (
    (seasons.includes('summer') || seasons.includes('winter')) &&
    now.getHours() - sunrise.getHours() <= 3 &&
    now.getHours() - sunrise.getHours() > 0
  ) {
    starRating++
    fishingConditionsNotes.push('within the first three hours after sunrise')
  } else if (
    !seasons.includes('summer') &&
    !seasons.includes('winter') &&
    now.getHours() - sunrise.getHours() > 3
  ) {
    starRating++
    fishingConditionsNotes.push('at least three hours after sunrise')
  }

  if (useCurrentWeather) {
    if (weather.current.wind_mph < 6) {
      starRating += 3
      fishingConditionsNotes.push('not too windy')
    } else if (weather.current.wind_mph < 10) {
      starRating += 2
      fishingConditionsNotes.push('fairly windy')
    } else if (weather.current.wind_mph < 13) {
      starRating++
      fishingConditionsNotes.push('pretty windy')
    } else {
      starRating--
      fishingConditionsNotes.push('very windy')
    }
  } else {
    if (weather.forecast.forecastday[0].day.maxwind_mph < 6) {
      starRating += 3
      fishingConditionsNotes.push('not too windy')
    } else if (weather.forecast.forecastday[0].day.maxwind_mph < 10) {
      starRating += 2
      fishingConditionsNotes.push('fairly windy')
    } else if (weather.forecast.forecastday[0].day.maxwind_mph < 13) {
      starRating++
      fishingConditionsNotes.push('pretty windy')
    } else {
      starRating--
      fishingConditionsNotes.push('very windy')
    }
  }

  if (weather.current.pressure_in < 29.8) {
    starRating += 2
    fishingConditionsNotes.push('very good barometric pressure')
  } else if (
    weather.current.pressure_in >= 29.8 &&
    weather.current.pressure_in <= 30.2
  ) {
    starRating++
    fishingConditionsNotes.push('ideal barometric pressure')
  } else {
    starRating--
    fishingConditionsNotes.push('not good barometric pressure')
  }

  if (weather.forecast.forecastday[0].day.daily_chance_of_rain < 70) {
    starRating++
    fishingConditionsNotes.push('low to no chance of rain')
  } else {
    starRating--
    fishingConditionsNotes.push('high chance of rain')
  }

  for (
    let hourIndex = now.getHours();
    hourIndex < now.getHours() + 4;
    hourIndex++
  ) {
    const forecastHour =
      hourIndex < weather.forecast.forecastday[0].hour.length
        ? weather.forecast.forecastday[0].hour[hourIndex]
        : undefined
    const isEndOfDay =
      hourIndex == weather.forecast.forecastday[0].hour.length - 1

    // if forecast hour is out of bounds or we reached the end of the hours array
    if (!forecastHour || isEndOfDay) {
      break
    }

    // if it will rain within the next two hours, no good
    if (forecastHour.will_it_rain == 1 && hourIndex < now.getHours() + 2) {
      starRating--
      fishingConditionsNotes.push('will rain within the next two hours')
      break
    }

    // if it will rain in exactly three hours, good
    if (forecastHour.will_it_rain == 1 && hourIndex == now.getHours() + 3) {
      starRating++
      fishingConditionsNotes.push('will rain in three hours but not before')
      break
    }
  }

  if (weather.current.cloud == 100) {
    starRating += 3
    fishingConditionsNotes.push('very cloudy')
  } else if (weather.current.cloud >= 75) {
    starRating += 2
    fishingConditionsNotes.push('mostly cloudy')
  } else if (weather.current.cloud >= 50) {
    starRating++
    fishingConditionsNotes.push('partly cloudy')
  }

  if (starRating >= 10) {
    fishingConditionsText += '+++'
  } else if (starRating >= 7) {
    fishingConditionsText += '++'
  } else if (starRating >= 4) {
    fishingConditionsText += '+'
  }

  fishingConditions.conditionsText = fishingConditionsText
  fishingConditions.conditionsNotes = fishingConditionsNotes

  return fishingConditions
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
