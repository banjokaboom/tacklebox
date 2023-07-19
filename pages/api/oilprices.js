import axios from 'axios'
import cheerio from 'cheerio'

export default function handler(req, res) {
  const state = req.query.state
  const zone = req.query.zone

  console.log('Loading best oil price for ' + state + ' zone ' + zone)

  let url = ''
  if (state == 'maine') {
    url = 'https://www.maineoil.com/zone' + zone + '.asp?type=0'
  } else {
    url = 'https://www.newenglandoil.com/' + state + '/zone' + zone + '.asp?x=0'
  }

  axios
    .get(url)
    .then((ares) => {
      const $ = cheerio.load(ares.data)
      let lowestPrice = 99
      let lowestPriceCompany = ''
      let lowestPriceCompanyURL = ''
      let allOilPrices = []

      $('[data-label="Price"]').each(function (index, element) {
        const price = parseFloat($(element).text().replace('$', '')).toFixed(3)
        const company = $(element)
          .parent()
          .find('[data-label="Company"]')
          .text()
        let url = $(element)
          .parent()
          .find('[data-label="Company"] > a')
          .attr('href')
        if (url && url.indexOf('click.asp') == 0) {
          url = 'https://www.newenglandoil.com/massachusetts/' + url
        }

        allOilPrices.push({ price, company, url })

        if (price !== '0.000' && price < lowestPrice) {
          lowestPrice = price
          lowestPriceCompany = company
          lowestPriceCompanyURL = url
        }
      })

      res.json({
        price: lowestPrice,
        company: lowestPriceCompany,
        url: lowestPriceCompanyURL,
        allOilPrices,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err })
    })
}
