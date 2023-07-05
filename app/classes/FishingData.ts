import BaitRecommendations from './BaitRecommendations'
import Tackle from './Tackle'
import WeatherData from './WeatherData'

export default class FishingData {
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
