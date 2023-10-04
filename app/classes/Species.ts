export default class Species {
  public name: string
  public water_type: string
  public min_water_temp: number
  public max_water_temp: number

  constructor(
    name: string,
    water_type: string,
    min_water_temp: number,
    max_water_temp: number
  ) {
    this.name = name
    this.water_type = water_type
    this.min_water_temp = min_water_temp
    this.max_water_temp = max_water_temp
  }
}
