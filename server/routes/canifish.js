import express from 'express'
import axios from 'axios'
import cheerio from 'cheerio'
import _ from 'lodash'

const router = express.Router()

const charsRegex = /(\n|\t|<\/?p>|&nbsp;|\(\d?,?\s?\d?\)|\*|:)+/gim
const newLineRegex = /(\n|\t|<\/?p>|<br\/?>|&nbsp;)+/gim
const extraRegex = /(\s,\s|,\s,)+/gim

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
          species = speciesQuery
            .text()
            .replace(charsRegex, '')
            .replace(newLineRegex, ', ')
            .replace(extraRegex, ', ')
            .trim()
        }

        // Get the open season dates, limits, and minimum lengths
        let description = $(element).children('td:nth-child(1)')
        let seasonDates = $(element).children('td:nth-child(2)')
        let seasonLimits = $(element).children('td:nth-child(3)')
        let minimumLength = $(element).children('td:nth-child(4)')
        let speciesSeasonInfo = { species: species }

        if (description[0]) {
          speciesSeasonInfo['description'] = description
            .text()
            .replace(charsRegex, '')
            .replace(newLineRegex, ', ')
            .replace(extraRegex, ', ')
            .replace(extraRegex, '')
            .trim()
        }

        if (seasonDates[0]) {
          let seasonDatesHTML = seasonDates.html().replace(/(\n|\t)+/gim, '')

          if (seasonDatesHTML.indexOf('</p><p>') >= 0) {
            let speciesSeasonDates = []

            _.each(seasonDatesHTML.split('</p><p>'), (value) => {
              let speciesSeasonDate = value
                .replace(charsRegex, '')
                .replace(newLineRegex, ', ')
                .replace(extraRegex, ', ')
                .trim()
              if (speciesSeasonDate.trim() !== '') {
                speciesSeasonDates.push(speciesSeasonDate)
              }
            })

            speciesSeasonInfo['seasonDates'] = speciesSeasonDates
          } else if (seasonDatesHTML.indexOf('<br>') >= 0) {
            let speciesSeasonDates = []

            _.each(seasonDatesHTML.split('<br>'), (value) => {
              let speciesSeasonDate = value
                .replace(charsRegex, '')
                .replace(newLineRegex, ', ')
                .replace(extraRegex, ', ')
                .trim()
              if (speciesSeasonDate.trim() !== '') {
                speciesSeasonDates.push(speciesSeasonDate)
              }
            })

            speciesSeasonInfo['seasonDates'] = speciesSeasonDates
          } else {
            speciesSeasonInfo['seasonDates'] = [
              seasonDatesHTML.replace(charsRegex, ''),
            ]
          }
        }
        if (seasonLimits[0]) {
          speciesSeasonInfo['seasonLimits'] = seasonLimits
            .html()
            .replace(charsRegex, '')
            .replace(newLineRegex, ', ')
            .replace(extraRegex, ', ')
            .split(',')
        }
        if (minimumLength[0]) {
          speciesSeasonInfo['minimumLength'] = minimumLength
            .html()
            .replace(charsRegex, '')
            .replace('Only one fish may,', 'Only one fish may')
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

      $('#649475cdc5f43 > table:nth-child(1) > tbody:nth-child(2) > tr').each(
        function (index, element) {
          // Get the open season dates, limits, and minimum lengths
          let description = $(element).children('td:nth-child(1)')
          let seasonDates = $(element).children('td:nth-child(3)')
          let seasonLimits = $(element).children('td:nth-child(4)')
          let minimumLength = $(element).children('td:nth-child(2)')
          let speciesSeasonInfo = {}

          if (description[0]) {
            speciesSeasonInfo['species'] = description
              .text()
              .replace(charsRegex, '')
              .replace(newLineRegex, ', ')
              .replace(extraRegex, ', ')
              .trim()
            speciesSeasonInfo['description'] = description
              .text()
              .replace(charsRegex, '')
              .replace(newLineRegex, ', ')
              .replace(extraRegex, ', ')
              .trim()
          }

          if (seasonDates[0]) {
            let seasonDatesHTML = seasonDates
              .html()
              .replace(/(\n|\t)+/gim, '<br>')

            if (seasonDatesHTML.indexOf('</p><p>') >= 0) {
              let speciesSeasonDates = []

              _.each(seasonDatesHTML.split('</p><p>'), (value) => {
                let speciesSeasonDate = value
                  .replace(charsRegex, '')
                  .replace(newLineRegex, ', ')
                  .replace(extraRegex, ', ')
                  .trim()
                if (speciesSeasonDate.trim() !== '') {
                  speciesSeasonDates.push(speciesSeasonDate)
                }
              })

              speciesSeasonInfo['seasonDates'] = speciesSeasonDates
            } else if (seasonDatesHTML.indexOf('<br>') >= 0) {
              let speciesSeasonDates = []

              _.each(seasonDatesHTML.split('<br>'), (value) => {
                let speciesSeasonDate = value
                  .replace(charsRegex, '')
                  .replace(newLineRegex, ', ')
                  .replace(extraRegex, ', ')
                  .trim()
                if (speciesSeasonDate.trim() !== '') {
                  speciesSeasonDates.push(speciesSeasonDate)
                }
              })

              speciesSeasonInfo['seasonDates'] = speciesSeasonDates
            } else {
              speciesSeasonInfo['seasonDates'] = [
                seasonDatesHTML.replace(charsRegex, ''),
              ]
            }
          }
          if (seasonLimits[0]) {
            speciesSeasonInfo['seasonLimits'] = seasonLimits
              .html()
              .replace(newLineRegex, ', ')
              .replace(extraRegex, ', ')
              .split(',')
          }
          if (minimumLength[0]) {
            speciesSeasonInfo['minimumLength'] = minimumLength
              .html()
              .replace(newLineRegex, ', ')
              .replace(extraRegex, ', ')
              .replace('Only one fish may,', 'Only one fish may')
          }

          if (seasonDates[0] || seasonLimits[0] || minimumLength[0]) {
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
})

export default router
