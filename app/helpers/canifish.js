import _ from 'lodash'

const charsRegex = /(\n|\t|<\/?p>|&nbsp;|\(\d?,?\s?\d?\)|\*|:)+/gim
const newLineRegex = /(\n|\t|<\/?p>|<br\/?>|&nbsp;)+/gim
const extraRegex = /(\s,\s|,\s,)+/gim
const endRegex = /(,\s*)+/gim

export function getSpecies(species) {
  return species
    .text()
    .replace(charsRegex, '')
    .replace(newLineRegex, ', ')
    .replace(extraRegex, ', ')
    .replace(endRegex, '')
    .trim()
}

export function getDescription(description) {
  return description
    .text()
    .replace(charsRegex, '')
    .replace(newLineRegex, ', ')
    .replace(extraRegex, ', ')
    .replace(extraRegex, '')
    .replace(endRegex, '')
    .trim()
}

export function getSeasonDates(seasonDates) {
  let seasonDatesHTML = seasonDates.html().replace(newLineRegex, '<br>')

  if (
    seasonDatesHTML.indexOf('</p><p>') >= 0 ||
    seasonDatesHTML.indexOf('<br>') >= 0
  ) {
    let speciesSeasonDates = []
    let seasonDatesArray = seasonDatesHTML.split('</p><p>')
    seasonDatesArray.concat(seasonDatesHTML.split('<br>'))

    _.each(seasonDatesArray, (value) => {
      let speciesSeasonDate = value
        .replace(charsRegex, '')
        .replace(newLineRegex, ', ')
        .replace(extraRegex, ', ')
        .replace(endRegex, '')
        .trim()
      if (speciesSeasonDate.trim() !== '') {
        speciesSeasonDates.push(speciesSeasonDate)
      }
    })

    return speciesSeasonDates
  } else {
    return [seasonDatesHTML.replace(charsRegex, '')]
  }
}

export function getSeasonLimits(seasonLimits) {
  let limits = []

  const seasonLimitsArray = seasonLimits
    .html()
    .replace(newLineRegex, ', ')
    .replace(extraRegex, ', ')
    .replace(endRegex, '')
    .split(',')

  seasonLimitsArray.forEach((limit) => {
    if (limit.trim() !== '') {
      limits.push(limit.trim())
    }
  })

  return limits
}

export function getMinimumLength(minimumLength) {
  return minimumLength
    .html()
    .replace(newLineRegex, ', ')
    .replace(extraRegex, ', ')
    .replace('Only one fish may,', 'Only one fish may')
}

export function getSpeciesSeasonInfo(
  species,
  description,
  seasonDates,
  seasonLimits,
  minimumLength
) {
  let speciesSeasonInfo = {}

  speciesSeasonInfo['species'] = species

  if (description[0]) {
    speciesSeasonInfo['description'] = getDescription(description)
  }

  if (seasonDates[0]) {
    speciesSeasonInfo['seasonDates'] = getSeasonDates(seasonDates)
  }
  if (seasonLimits[0]) {
    speciesSeasonInfo['seasonLimits'] = getSeasonLimits(seasonLimits)
  }
  if (minimumLength[0]) {
    speciesSeasonInfo['minimumLength'] = getMinimumLength(minimumLength)
  }

  if (
    speciesSeasonInfo.species &&
    (speciesSeasonInfo.seasonDates ||
      speciesSeasonInfo.seasonLimits ||
      speciesSeasonInfo.minimumLength)
  ) {
    return speciesSeasonInfo
  } else {
    return null
  }
}
