import axios from 'axios'
import cheerio from 'cheerio'
import { getSpeciesSeasonInfo } from '@/app/helpers/canifish'

export default function handler(req, res) {
  let url =
    'https://dem.ri.gov/natural-resources-bureau/fish-wildlife/rules-regulations/freshwater-sizes-and-limits'
  axios
    .get(url)
    .then((ares) => {
      const $ = cheerio.load(ares.data)
      let fishingData = []
      let species = '' //to cache between iterations

      $('.clearfix > table:nth-child(1) > tbody:nth-child(1) > tr').each(
        function (index, element) {
          if ($(element).children().length == 1) {
            return
          }

          if ($(element).children('td:nth-child(1)')) {
            species = $(element).children('td:nth-child(1)').text()
          }
          let description = species
          let seasonDates = $(element).children('td:nth-child(3)')
          let seasonLimits = $(element).children('td:nth-child(4)')
          let minimumLength = $(element).children('td:nth-child(5)')

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
        }
      )

      res.json({ fishingData, regulationsLink: url })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err })
    })
}
