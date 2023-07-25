export default class FishingConditions {
  public conditionsText: string
  public positiveConditionsNotes: string[]
  public negativeConditionsNotes: string[]

  constructor() {
    this.conditionsText = ''
    this.positiveConditionsNotes = []
    this.negativeConditionsNotes = []
  }
}
