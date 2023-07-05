import WeatherDataChild from './WeatherDataChild'

export default class WeatherData {
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
