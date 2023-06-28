import axios from 'axios'
import cheerio from 'cheerio'
import {
  getSpecies,
  getSpeciesSeasonInfo,
} from '../../../../server/helpers/canifish.js'

export default function handler(req, res) {
  let url = 'https://www.mass.gov/guides/freshwater-fishing-regulations'
  axios
    .get(url)
    .then((ares) => {
      const $ = cheerio.load(ares.data)
      let fishingData = []
      let species = '' //to cache between iterations

      $('table > tbody:nth-child(2) > tr').each(function (index, element) {
        // Get the fish species
        let speciesQuery = $(element).find('strong')
        if (speciesQuery[0] || speciesQuery.text().trim() != '') {
          species = getSpecies(speciesQuery)
        }
        let description = $(element).children('td:nth-child(1)')
        let seasonDates = $(element).children('td:nth-child(2)')
        let seasonLimits = $(element).children('td:nth-child(3)')
        let minimumLength = $(element).children('td:nth-child(4)')

        let speciesSeasonInfo = getSpeciesSeasonInfo(
          species,
          description,
          seasonDates,
          seasonLimits,
          minimumLength
        )
        if (speciesSeasonInfo) {
          fishingData.push(speciesSeasonInfo)
        }
      })

      res.json({ fishingData, regulationsLink: url })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err })
    })
}
