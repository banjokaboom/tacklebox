export default class Tackle {
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
