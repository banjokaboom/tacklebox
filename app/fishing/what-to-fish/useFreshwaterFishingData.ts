import Tackle from '@/app/classes/Tackle'
import CityState from '@/app/classes/CityState'
import BaitRecommendations from '@/app/classes/BaitRecommendations'
import FishingData from '@/app/classes/FishingData'
import { getSeasons } from '@/app/helpers/date'
import {
  getFishingConditions,
  getWeather,
  pickTackle,
  getWeatherValues,
} from '@/app/helpers/whattofish'
import { convertArrayToCommaSeparatedString } from '@/app/helpers/string'

export function pickBaitRecommendations(
  weather: any,
  species: string[],
  seasons: string
): BaitRecommendations {
  let baitRecommendations = new BaitRecommendations()
  let stylesToUse: string[] = []
  let baitToUse: string[] = []

  baitToUse.push('live worms, soft plastic worms')

  if (species.includes('catfish')) {
    baitToUse.push('stinky bait')
  }

  if (species.includes('carp')) {
    baitToUse.push('corn', 'bread')
  }

  if (seasons.includes('spring') || seasons.includes('fall')) {
    if (
      species.includes('largemouth bass') ||
      species.includes('smallmouth bass') ||
      species.includes('catfish')
    ) {
      stylesToUse.push('craw')
      baitToUse.push('soft plastic craws')
    }
    stylesToUse.push('orange', 'bug', 'beetle', 'grub', 'insect')
    baitToUse.push('powerbait', 'soft plastic insects')
  }

  if (
    species.includes('smallmouth bass') &&
    (seasons.includes('bass pre-spawn') ||
      seasons.includes('smallmouth bass spawn'))
  ) {
    baitToUse.push('tubes')
  }

  if (
    seasons.includes('summer') ||
    seasons.includes('fall') ||
    seasons.includes('winter')
  ) {
    stylesToUse.push('shad', 'baitfish', 'white', 'blue')
    baitToUse.push('soft plastic swimbaits', 'shiners')

    if (seasons.includes('summer')) {
      if (species.includes('largemouth bass')) {
        stylesToUse.push('frog', 'critter')
        baitToUse.push('soft plastic frogs', 'soft plastic lizards')
      }
    } else {
      baitToUse.push('powerbait')
    }
  }

  if (
    weather.current.cloud >= 75 ||
    seasons.includes('spring') ||
    seasons.includes('fall')
  ) {
    stylesToUse.push('red')
  }

  if (weather.current.cloud >= 75) {
    stylesToUse.push('dark', 'black')
    if (!stylesToUse.includes('blue')) {
      stylesToUse.push('blue')
    }
  } else {
    stylesToUse.push('natural', 'gold', 'silver', 'green')
  }

  let colorString = convertArrayToCommaSeparatedString(stylesToUse)

  let baitString = convertArrayToCommaSeparatedString(baitToUse)

  baitRecommendations.stylesToUse = colorString
  baitRecommendations.baitsToUse = baitString

  return baitRecommendations
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
  const waterTempMultiplier = seasons.length > 1 ? 0.875 : 0.95
  const waterTemp =
    waterTempMultiplier * weather.forecast.forecastday[0].day.maxtemp_f

  if (cityStateString && cityStateString !== '') {
    state = cityStateString.split(',')[1]
  } else {
    state = weather.location.region
  }

  cityState = cityStateList.find((cs) => {
    return cs.state == state
  })

  if (cityState && cityState.location.includes('north')) {
    switch (todayMonth) {
      case 3:
        seasons.push('trout stocking')
        seasons.push('spring transition')
        break
      case 4:
        seasons.push('trout stocking')
        seasons.push('walleye pre-spawn')
        seasons.push('perch pre-spawn')
        seasons.push('pike pre-spawn')
        seasons.push('pickerel pre-spawn')
        seasons.push('muskie pre-spawn')
        break
      case 5:
        if (waterTemp >= 42.5 || today.getDate() > 15) {
          seasons.push('walleye spawn')
          seasons.push('perch spawn')
          seasons.push('pike spawn')
        } else {
          seasons.push('walleye pre-spawn')
          seasons.push('perch pre-spawn')
          seasons.push('pike pre-spawn')
        }
        if (waterTemp >= 47.5 || today.getDate() > 15) {
          seasons.push('pickerel spawn')
        } else {
          seasons.push('pickerel pre-spawn')
        }
        if (waterTemp >= 52.5 || today.getDate() > 15) {
          seasons.push('muskie spawn')
        } else {
          seasons.push('muskie pre-spawn')
        }
        seasons.push('sunfish pre-spawn')
        seasons.push('crappie pre-spawn')
        seasons.push('bass pre-spawn')
        break
      case 6:
        if (waterTemp >= 58.5 || today.getDate() > 15) {
          seasons.push('smallmouth bass spawn')
          seasons.push('crappie spawn')
        } else {
          seasons.push('bass pre-spawn')
          seasons.push('crappie pre-spawn')
        }
        if (waterTemp >= 62.5 || today.getDate() > 15) {
          seasons.push('largemouth bass spawn')
        } else if (!seasons.includes('bass pre-spawn')) {
          seasons.push('bass pre-spawn')
        }
        seasons.push('sunfish spawn')
        seasons.push('catfish pre-spawn')
        seasons.push('carp pre-spawn')
        seasons.push('summer transition')
        break
      case 7:
        if (waterTemp >= 68.5 || today.getDate() > 15) {
          seasons.push('catfish spawn')
        } else {
          seasons.push('catfish pre-spawn')
        }
        seasons.push('carp spawn')
        break
      case 9:
        seasons.push('trout stocking')
        seasons.push('fall transition')
        break
      case 10:
        seasons.push('trout stocking')
        break
      case 12:
        seasons.push('winter transition')
        break
      default:
        break
    }
  }
  if (cityState && cityState.location.includes('mid')) {
    switch (todayMonth) {
      case 3:
        seasons.push('walleye pre-spawn')
        seasons.push('perch pre-spawn')
        seasons.push('pike pre-spawn')
        seasons.push('pickerel pre-spawn')
        seasons.push('muskie pre-spawn')
        break
      case 4:
        if (waterTemp >= 42.5 || today.getDate() > 15) {
          seasons.push('walleye spawn')
          seasons.push('perch spawn')
          seasons.push('pike spawn')
        } else {
          seasons.push('walleye pre-spawn')
          seasons.push('perch pre-spawn')
          seasons.push('pike pre-spawn')
        }
        if (waterTemp >= 47.5 || today.getDate() > 15) {
          seasons.push('pickerel spawn')
        } else {
          seasons.push('pickerel pre-spawn')
        }
        if (waterTemp >= 52.5 || today.getDate() > 15) {
          seasons.push('muskie spawn')
        } else {
          seasons.push('muskie pre-spawn')
        }
        seasons.push('sunfish pre-spawn')
        seasons.push('crappie pre-spawn')
        seasons.push('bass pre-spawn')
        break
      case 5:
        if (waterTemp >= 58.5 || today.getDate() > 15) {
          seasons.push('smallmouth bass spawn')
          seasons.push('crappie spawn')
        } else {
          seasons.push('bass pre-spawn')
          seasons.push('crappie pre-spawn')
        }
        if (waterTemp >= 62.5 || today.getDate() > 15) {
          seasons.push('largemouth bass spawn')
        } else if (!seasons.includes('bass pre-spawn')) {
          seasons.push('bass pre-spawn')
        }
        seasons.push('sunfish spawn')
        seasons.push('catfish pre-spawn')
        seasons.push('carp pre-spawn')
        break
      case 6:
        if (waterTemp >= 68.5 || today.getDate() > 15) {
          seasons.push('catfish spawn')
        } else {
          seasons.push('catfish pre-spawn')
        }
        seasons.push('carp spawn')
        break
      default:
        break
    }
  }
  if (cityState && cityState.location.includes('south')) {
    switch (todayMonth) {
      case 2:
        seasons.push('walleye pre-spawn')
        seasons.push('perch pre-spawn')
        seasons.push('pike pre-spawn')
        seasons.push('pickerel pre-spawn')
        seasons.push('muskie pre-spawn')
        break
      case 3:
        if (waterTemp >= 42.5 || today.getDate() > 15) {
          seasons.push('walleye spawn')
          seasons.push('pike spawn')
        } else {
          seasons.push('walleye pre-spawn')
          seasons.push('pike pre-spawn')
        }
        if (waterTemp >= 47.5 || today.getDate() > 15) {
          seasons.push('pickerel spawn')
        } else {
          seasons.push('pickerel pre-spawn')
        }
        if (waterTemp >= 52.5 || today.getDate() > 15) {
          seasons.push('muskie spawn')
          seasons.push('perch spawn')
        } else {
          seasons.push('muskie pre-spawn')
          seasons.push('perch pre-spawn')
        }
        seasons.push('sunfish pre-spawn')
        seasons.push('crappie pre-spawn')
        seasons.push('bass pre-spawn')
        break
      case 4:
        if (waterTemp >= 58.5 || today.getDate() > 15) {
          seasons.push('smallmouth bass spawn')
          seasons.push('crappie spawn')
        } else {
          seasons.push('bass pre-spawn')
          seasons.push('crappie pre-spawn')
        }
        if (waterTemp >= 62.5 || today.getDate() > 15) {
          seasons.push('largemouth bass spawn')
        } else if (!seasons.includes('bass pre-spawn')) {
          seasons.push('bass pre-spawn')
        }
        seasons.push('sunfish spawn')
        seasons.push('catfish pre-spawn')
        seasons.push('carp pre-spawn')
        break
      case 5:
        if (waterTemp >= 68.5 || today.getDate() > 15) {
          seasons.push('catfish spawn')
        } else {
          seasons.push('catfish pre-spawn')
        }
        seasons.push('carp spawn')
        break
      default:
        break
    }
  }

  let seasonString = convertArrayToCommaSeparatedString(seasons)

  return seasonString
}

export async function getFreshwaterFishingData(
  zip: string,
  cityState: string,
  weatherForecastToUse: string,
  tackleList: Tackle[],
  cityStateList: CityState[],
  geolocation: string,
  waterType: string,
  species?: string[]
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
    fishingData.weather = getWeatherValues(weather, fishingData.seasons)

    const waterTemp =
      weatherForecastToUse == 'current'
        ? parseFloat(fishingData.weather.current.waterTemp)
        : parseFloat(
            fishingData.weather.forecast[
              weatherForecastToUse == 'today' ? 0 : 1
            ].waterTemp
          )

    fishingData.activeSpecies = getSpecies(waterTemp, fishingData.seasons)
    fishingData.species =
      species !== undefined ? species : fishingData.activeSpecies

    fishingData.baitRecommendations = pickBaitRecommendations(
      weather,
      fishingData.species,
      fishingData.seasons
    )
    fishingData.tackle = await pickTackle(
      tackleList,
      fishingData.seasons,
      waterTemp,
      waterType
    )

    fishingData.tackle.forEach((tackle: Tackle) => {
      const conditions =
        weatherForecastToUse == 'current'
          ? fishingData.weather.current.conditions
          : fishingData.weather.forecast[
              weatherForecastToUse == 'today' ? 0 : 1
            ].conditions
      console.log(
        'tackle weather: ' +
          tackle.weather +
          ', conditions weather: ' +
          conditions
      )
      if (
        tackle.weather &&
        conditions.toUpperCase().includes(tackle.weather.toUpperCase())
      ) {
        tackle.confidence++
      }

      fishingData.seasons.split(',').forEach((s) => {
        if (tackle.type.includes(s)) {
          tackle.confidence++
        }
      })

      fishingData.species.forEach((s) => {
        if (tackle.species.includes(s)) {
          tackle.confidence++
        }
      })
      fishingData.baitRecommendations.stylesToUse.split(',').forEach((s) => {
        if (tackle.type.includes(s)) {
          tackle.confidence++
        }
      })
    })

    fishingData.fishingConditions = getFishingConditions(
      weather,
      fishingData,
      weatherForecastToUse
    )
  } else if (
    geolocation !== '' ||
    cityState !== '' ||
    (zip !== '' && zip.length == 5)
  ) {
    throw 'Unable to load weather for location: ' + location
  }

  return fishingData
}

function getSpecies(waterTemp: number, seasons: string): string[] {
  let species: string[] = []

  if (waterTemp >= 31.5 && waterTemp <= 82.5) {
    if (waterTemp >= 42.5) {
      species.push('perch')
    }
    if (waterTemp >= 58.5) {
      species.push('largemouth bass', 'catfish')
    }

    if (waterTemp >= 47.5 && waterTemp <= 72.5) {
      species.push('smallmouth bass', 'carp')
    }

    if (waterTemp > 61.5) {
      species.push('sunfish')
    }

    if (!seasons.includes('summer') && waterTemp <= 66.5) {
      species.push('trout')
    }

    species.push('pickerel', 'pike', 'muskie')
  }

  return species.length > 0
    ? species
    : ['Not ideal fishing weather for any species']
}
