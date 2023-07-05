export default class Recipe {
  public name: string
  public seasons: string[]
  public frequency: number
  public ingredients: string[]

  constructor() {
    this.name = ''
    this.seasons = []
    this.frequency = 0
    this.ingredients = []
  }
}
