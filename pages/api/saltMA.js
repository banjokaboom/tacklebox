import axios from 'axios'
import cheerio from 'cheerio'
import { getSpecies, getSpeciesSeasonInfo } from '../../app/helpers/canifish'

export default function handler(req, res) {
  let url =
    'https://www.mass.gov/service-details/recreational-saltwater-fishing-regulations'
  axios
    .get(url)
    .then((ares) => {
      const $ = cheerio.load(ares.data)
      let fishingData = []
      let species = '' //to cache between iterations

      $(
        '.ma__rich-text__container:nth-child(2) table:nth-child(1) > tbody:nth-child(2) > tr'
      ).each(function (index, element) {
        // Get the open season dates, limits, and minimum lengths
        let description = $(element).children('td:nth-child(1)')
        if (description[0] && description.text().trim() != '') {
          species = getSpecies(description.text())
        }
        let seasonDates = $(element).children('td:nth-child(3)')
        let seasonLimits = $(element).children('td:nth-child(4)')
        let minimumLength = $(element).children('td:nth-child(2)')

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
