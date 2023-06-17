import express from 'express'
import axios from 'axios'
import cheerio from 'cheerio'
import _ from 'lodash'

const router = express.Router()

router.use('/canifish/freshMA', (req, res) => {
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
        if (speciesQuery[0] && speciesQuery.text().trim() != '') {
          species = speciesQuery.text().replace(/\n+\t+/gim, '')
        }

        // Get the open season dates, limits, and minimum lengths
        let description = $(element).children('td:nth-child(1)')
        let seasonDates = $(element).children('td:nth-child(2)')
        let seasonLimits = $(element).children('td:nth-child(3)')
        let minimumLength = $(element).children('td:nth-child(4)')
        let htmlReplaceRegex = /(\n|\t|<\/?p>|<br\/?>)+/gim
        let speciesSeasonInfo = { species: species }

        if (description[0]) {
          speciesSeasonInfo['description'] = description
            .text()
            .replace(/(\n|\t|\d,?)+/gim, '')
        }

        if (seasonDates[0]) {
          let seasonDatesHTML = seasonDates.html().replace(/(\n|\t)+/gim, '')

          if (seasonDatesHTML.indexOf('</p><p>') >= 0) {
            let speciesSeasonDates = []

            _.each(seasonDatesHTML.split('</p><p>'), (value) => {
              speciesSeasonDates.push(value.replace(htmlReplaceRegex, ''))
            })

            speciesSeasonInfo['seasonDates'] = speciesSeasonDates
          } else if (seasonDatesHTML.indexOf('<br>') >= 0) {
            let speciesSeasonDates = []

            _.each(seasonDatesHTML.split('</p><p>'), (value) => {
              speciesSeasonDates.push(value.replace(htmlReplaceRegex, ''))
            })

            speciesSeasonInfo['seasonDates'] = speciesSeasonDates
          } else {
            speciesSeasonInfo['seasonDates'] = seasonDatesHTML.replace(
              htmlReplaceRegex,
              ''
            )
          }
        }
        if (seasonLimits[0]) {
          speciesSeasonInfo['seasonLimits'] = seasonLimits
            .html()
            .replace(htmlReplaceRegex, '')
        }
        if (minimumLength[0]) {
          speciesSeasonInfo['minimumLength'] = minimumLength
            .html()
            .replace(htmlReplaceRegex, '')
        }

        if (seasonDates[0] || seasonLimits[0] || minimumLength[0]) {
          fishingData.push(speciesSeasonInfo)
        }
      })

      res.json({ fishingData, regulationsLink: url })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err })
    })
})

router.use('/canifish/saltMA', (req, res) => {
  let url =
    'https://www.mass.gov/service-details/recreational-saltwater-fishing-regulations'
  axios
    .get(url)
    .then((ares) => {
      const $ = cheerio.load(ares.data)
      let fishingData = []

      $(
        '#main-content section.ma__rich-text__container:nth-of-type(1) table tbody tr'
      ).each(function (index, element) {
        // Get the open season dates, limits, and minimum lengths
        let description = $(element).children('td:nth-child(1)')
        let seasonDates = $(element).children('td:nth-child(3)')
        let seasonLimits = $(element).children('td:nth-child(5)')
        let minimumLength = $(element).children('td:nth-child(4)')
        let htmlReplaceRegex = /(\n|\t|<\/?p>|<br\/?>)+/gim
        let speciesSeasonInfo = {}

        if (description[0]) {
          speciesSeasonInfo['species'] = description
            .text()
            .replace(/(\n|\t|\d,?|\(.+\)|\*)+/gim, '')
          speciesSeasonInfo['description'] = description
            .text()
            .replace(/(\n|\t|\d,?)+/gim, '')
        }

        if (seasonDates[0]) {
          let seasonDatesHTML = seasonDates.html().replace(/(\n|\t)+/gim, '')

          if (seasonDatesHTML.indexOf('</p><p>') >= 0) {
            let speciesSeasonDates = []

            _.each(seasonDatesHTML.split('</p><p>'), (value) => {
              speciesSeasonDates.push(value.replace(htmlReplaceRegex, ''))
            })

            speciesSeasonInfo['seasonDates'] = speciesSeasonDates
          } else if (seasonDatesHTML.indexOf('<br>') >= 0) {
            let speciesSeasonDates = []

            _.each(seasonDatesHTML.split('</p><p>'), (value) => {
              speciesSeasonDates.push(value.replace(htmlReplaceRegex, ''))
            })

            speciesSeasonInfo['seasonDates'] = speciesSeasonDates
          } else {
            speciesSeasonInfo['seasonDates'] = seasonDatesHTML.replace(
              htmlReplaceRegex,
              ''
            )
          }
        }
        if (seasonLimits[0]) {
          speciesSeasonInfo['seasonLimits'] = seasonLimits
            .html()
            .replace(htmlReplaceRegex, '')
        }
        if (minimumLength[0]) {
          speciesSeasonInfo['minimumLength'] = minimumLength
            .html()
            .replace(htmlReplaceRegex, '')
        }

        if (seasonDates[0] || seasonLimits[0] || minimumLength[0]) {
          fishingData.push(speciesSeasonInfo)
        }
      })

      res.json({ fishingData, regulationsLink: url })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err })
    })
})

export default router
