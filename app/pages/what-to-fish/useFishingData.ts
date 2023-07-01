export class Tackle {
  public name: string
  public confidence: number
  public species: string[]
  public waterTemp: string[]
  public type: string[]
  public depth: string[]

  constructor() {
    this.name = ''
    this.confidence = 10
    this.species = []
    this.waterTemp = []
    this.type = []
    this.depth = []
  }
}
export class CityState {
  public state: string
  public capital: string
  public location: string[]

  constructor() {
    this.state = ''
    this.capital = ''
    this.location = []
  }
}

class WeatherData {
  public outdoorTemp: string
  public waterTemp: string
  public conditions: string
  public wind: string
  public location: string
  public current: WeatherDataChild
  public forecast: WeatherDataChild

  constructor() {
    this.outdoorTemp = ''
    this.waterTemp = ''
    this.conditions = ''
    this.wind = ''
    this.location = ''
    this.current = new WeatherDataChild()
    this.forecast = new WeatherDataChild()
  }
}

class WeatherDataChild {
  public outdoorTemp: string
  public waterTemp: string
  public conditions: string
  public wind: string

  constructor() {
    this.outdoorTemp = ''
    this.waterTemp = ''
    this.conditions = ''
    this.wind = ''
  }
}

class BaitRecommendations {
  public colorsToUse: string
  public baitsToUse: string

  constructor() {
    this.colorsToUse = ''
    this.baitsToUse = ''
  }
}

export class FishingData {
  public baitRecommendations: BaitRecommendations
  public seasons: string
  public tackle: Tackle[]
  public weather: WeatherData
  public species: string

  constructor() {
    this.baitRecommendations = new BaitRecommendations()
    this.seasons = ''
    this.tackle = []
    this.weather = new WeatherData()
    this.species = ''
  }
}

const waterTempMultiplier = 0.87
const warmWaterMax = 80
const warmWaterMin = 60

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
  species: string[],
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
  species: string[],
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
    baitToUse.push('corn')
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
    colorsToUse.push('orange', 'red')
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

  if (weather.current.cloud >= 75) {
    colorsToUse.push('bright', 'yellow', 'pink')
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

    if (!tackle.type.includes('still') && !tackle.type.includes('finesse')) {
      return false
    }

    if (!tackle.depth.includes('deep')) {
      return false
    }
  }

  return true
}

function getSeasons(
  weather: any,
  cityStateString: string,
  cityStateList: CityState[]
): string {
  let today = new Date()
  let todayMonth = today.getMonth() + 1
  let seasons: string[] = []
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
    case 1:
    case 2:
      seasons.push('winter')
      break
    case 3:
      seasons.push('spring', 'winter')
      if (cityState && cityState.location.includes('south')) {
        seasons.push('bass pre-spawn')
        seasons.push('sunfish pre-spawn')
        seasons.push('pickerel/pike/muskies pre-spawn')
      }
      break
    case 4:
      seasons.push('spring')
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
      seasons.push('spring')
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
      seasons.push('spring', 'summer')
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
      seasons.push('summer')
      if (cityState && cityState.location.includes('north')) {
        seasons.push('catfish pre-spawn')
        seasons.push('carp spawn')
      }
      if (cityState && cityState.location.includes('mid')) {
        seasons.push('catfish spawn')
      }
      break
    case 8:
      seasons.push('summer')
      if (cityState && cityState.location.includes('north')) {
        seasons.push('catfish spawn')
      }
      break
    case 9:
      seasons.push('summer', 'fall')
      break
    case 10:
    case 11:
      seasons.push('fall')
      break
    case 12:
      seasons.push('fall', 'winter')
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
    fishingData.seasons = getSeasons(weather, cityState, cityStateList)
    fishingData.weather = getWeatherValues(weather)

    const waterTemp = useCurrentWeather
      ? parseFloat(fishingData.weather.current.waterTemp)
      : parseFloat(fishingData.weather.forecast.waterTemp)

    fishingData.species = getSpecies(waterTemp)
    fishingData.baitRecommendations = pickBaitRecommendations(
      weather,
      fishingData.species.split(','),
      fishingData.seasons
    )
    fishingData.tackle = await pickTackle(
      tackleList,
      fishingData.seasons,
      fishingData.species.split(','),
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

  if (waterTemp >= 34 && waterTemp <= 80) {
    if (waterTemp >= 60) {
      species += 'largemouth bass, catfish, '
    }

    if (waterTemp >= 50 && waterTemp <= 70) {
      species += 'smallmouth bass, carp, '
    }

    if (waterTemp > 64) {
      species += 'sunfish, '
    } else {
      species += 'trout, '
    }

    species += 'pickerel/pike/muskies'
  }

  return species !== '' ? species : 'Not ideal fishing weather for any species'
}
