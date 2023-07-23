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

function pickBaitRecommendations(): BaitRecommendations {
  let baitRecommendations = new BaitRecommendations()
  let colorsToUse: string[] = []
  let baitToUse: string[] = []

  baitToUse.push('live sand worms', 'shrimp', 'squid', 'crab')

  let colorString = convertArrayToCommaSeparatedString(colorsToUse)

  let baitString = convertArrayToCommaSeparatedString(baitToUse)

  baitRecommendations.colorsToUse = colorString
  baitRecommendations.baitsToUse = baitString

  return baitRecommendations
}

function getFishingSeasons(): string {
  let seasons: string[] = getSeasons()

  let seasonString = convertArrayToCommaSeparatedString(seasons)

  return seasonString
}

export async function getSaltwaterFishingData(
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
    fishingData.weather = getWeatherValues(weather, fishingData.seasons)

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

    fishingData.fishingConditions = getFishingConditions(
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
