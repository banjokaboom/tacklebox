export default class OilPriceData {
  public price: string
  public company: string
  public url: string
  public oilPrices: object[]

  constructor() {
    this.price = ''
    this.company = ''
    this.url = ''
    this.oilPrices = []
  }
}
