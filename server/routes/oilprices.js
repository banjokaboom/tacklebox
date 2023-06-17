import express from 'express'
import axios from 'axios'
import cheerio from 'cheerio'

const router = express.Router()

router.use('/oilprices/oilPrices', (req, res) => {
  let url = 'https://www.newenglandoil.com/massachusetts/zone10.asp?x=0'
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
        if (url.indexOf('click.asp') == 0) {
          url = 'https://www.newenglandoil.com/massachusetts/' + url
        }

        allOilPrices.push({ price, company, url })

        if (price < lowestPrice) {
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
})

export default router
