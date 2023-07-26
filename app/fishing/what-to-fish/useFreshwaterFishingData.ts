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
    colorsToUse.push('orange', 'bug', 'beetle', 'grub')
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

  let colorString = convertArrayToCommaSeparatedString(colorsToUse)

  let baitString = convertArrayToCommaSeparatedString(baitToUse)

  baitRecommendations.colorsToUse = colorString
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

  let seasonString = convertArrayToCommaSeparatedString(seasons)

  return seasonString
}

export async function getFreshwaterFishingData(
  zip: string,
  cityState: string,
  useCurrentWeather: boolean,
  tackleList: Tackle[],
  cityStateList: CityState[],
  geolocation: string,
  waterType: string
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
      waterTemp,
      waterType
    )
    fishingData.fishingConditions = getFishingConditions(
      weather,
      fishingData.species,
      fishingData.seasons,
      useCurrentWeather
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

    species += 'pickerel, pike, muskies'
  }

  return species !== '' ? species : 'Not ideal fishing weather for any species'
}
