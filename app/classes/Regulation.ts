export default class Regulation {
  public species: string
  public description: string
  public seasonDates: string[]
  public seasonLimits: string[]
  public minimumLength: string

  constructor() {
    this.species = ''
    this.description = ''
    this.seasonDates = []
    this.seasonLimits = []
    this.minimumLength = ''
  }
}
