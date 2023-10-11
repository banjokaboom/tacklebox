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
  getSpecies,
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
  cityStateList: CityState[],
  geolocation: string,
  waterType: string,
  setLoadingText: Function,
  species?: string[]
): Promise<FishingData> {
  let fishingData = new FishingData()

  setLoadingText('Loading weather...')
  const weather = await getWeather(zip, cityState, geolocation)

  setLoadingText('Loading tackle...')
  let tackleList: Tackle[] = []
  await fetch('/api/tackle')
    .then((res) => res.json())
    .then((json) => {
      tackleList = json.tackle
    })

  const location =
    geolocation !== '' ? geolocation : cityState !== '' ? cityState : zip

  if (location == '') {
    return fishingData
  }

  if (weather && weather.location) {
    setLoadingText('Getting fishing seasons...')
    fishingData.seasons = getFishingSeasons()
    setLoadingText('Getting weather values...')
    fishingData.weather = getWeatherValues(weather, fishingData.seasons)

    const waterTemp =
      weatherForecastToUse == 'current'
        ? parseFloat(fishingData.weather.current.waterTemp)
        : parseFloat(
            fishingData.weather.forecast[
              weatherForecastToUse == 'today' ? 0 : 1
            ].waterTemp
          )

    setLoadingText('Getting active species...')
    fishingData.activeSpecies = await getSpecies(waterTemp, waterType)

    fishingData.species =
      species !== undefined ? species : fishingData.activeSpecies

    setLoadingText('Picking bait...')
    fishingData.baitRecommendations = pickBaitRecommendations()

    setLoadingText('Picking tackle...')
    fishingData.tackle = await pickTackle(
      tackleList,
      fishingData,
      waterTemp,
      waterType
    )

    setLoadingText('Determining fishing conditions...')
    fishingData.fishingConditions = getFishingConditions(
      weather,
      fishingData,
      weatherForecastToUse
    )

    setLoadingText('Loading...')
  } else if (
    geolocation !== '' ||
    cityState !== '' ||
    (zip !== '' && zip.length == 5)
  ) {
    throw 'Unable to load weather for location: ' + location
  }

  return fishingData
}
