import Recipe from './Recipe'

export default class CookingData {
  public recipes: Recipe[]
  public ingredients: string[]

  constructor() {
    this.recipes = []
    this.ingredients = []
  }
}
