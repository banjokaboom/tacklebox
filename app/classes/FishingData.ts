import BaitRecommendations from './BaitRecommendations'
import FishingConditions from './FishingConditions'
import Tackle from './Tackle'
import WeatherData from './WeatherData'

export default class FishingData {
  public baitRecommendations: BaitRecommendations
  public seasons: string
  public tackle: Tackle[]
  public weather: WeatherData
  public species: string
  public fishingConditions: FishingConditions

  constructor() {
    this.baitRecommendations = new BaitRecommendations()
    this.seasons = ''
    this.tackle = []
    this.weather = new WeatherData()
    this.species = ''
    this.fishingConditions = new FishingConditions()
  }
}
