import Regulation from './Regulation'

export default class Regulations {
  public freshwaterRegulations: Regulation[]
  public freshwaterRegulationsLink: string
  public saltwaterRegulations: Regulation[]
  public saltwaterRegulationsLink: string

  constructor() {
    this.freshwaterRegulations = []
    this.freshwaterRegulationsLink = ''
    this.saltwaterRegulations = []
    this.saltwaterRegulationsLink = ''
  }
}
