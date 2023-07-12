import WeatherDataChild from './WeatherDataChild'
import AstroData from './AstroData'

export default class WeatherData {
  public outdoorTemp: string
  public waterTemp: string
  public conditions: string
  public wind: string
  public location: string
  public pressure: number
  public current: WeatherDataChild
  public forecast: WeatherDataChild
  public astro: AstroData

  constructor() {
    this.outdoorTemp = ''
    this.waterTemp = ''
    this.conditions = ''
    this.wind = ''
    this.location = ''
    this.pressure = 0
    this.current = new WeatherDataChild()
    this.forecast = new WeatherDataChild()
    this.astro = new AstroData()
  }
}
