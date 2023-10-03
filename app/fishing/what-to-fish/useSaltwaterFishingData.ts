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
  let stylesToUse: string[] = []
  let baitToUse: string[] = []

  baitToUse.push('live sand worms', 'shrimp', 'squid', 'crab', 'clams')

  let colorString = convertArrayToCommaSeparatedString(stylesToUse)

  let baitString = convertArrayToCommaSeparatedString(baitToUse)

  baitRecommendations.stylesToUse = colorString
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
  weatherForecastToUse: string,
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
    fishingData.seasons = getFishingSeasons()
    fishingData.weather = getWeatherValues(weather, fishingData.seasons)

    const waterTemp =
      weatherForecastToUse == 'current'
        ? parseFloat(fishingData.weather.current.waterTemp)
        : parseFloat(
            fishingData.weather.forecast[
              weatherForecastToUse == 'today' ? 0 : 1
            ].waterTemp
          )

    fishingData.species = getSpecies(waterTemp)
    fishingData.baitRecommendations = pickBaitRecommendations()
    fishingData.tackle = await pickTackle(
      tackleList,
      fishingData.seasons,
      waterTemp,
      waterType
    )

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

function getSpecies(waterTemp: number): string[] {
  let species: string[] = []

  if (waterTemp >= 31.5 && waterTemp <= 82.5) {
    species.push(
      'shark',
      'drum',
      'striped bass',
      'bluefish',
      'cod',
      'snook',
      'black sea bass',
      'haddock',
      'halibut',
      'mackerel',
      'scup',
      'tautog',
      'flounder'
    )
  }

  return species.length > 0
    ? species
    : ['Not ideal fishing weather for any species']
}
