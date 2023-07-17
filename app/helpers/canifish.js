import _ from 'lodash'

const charsRegex = /(\n|\t|\(\d?,?\s?\d?\)|\*|:)+/gim
const newLineRegex = /(\n|\t|<\/?p[A-z0-9"=:;\s]*>|<br\/?>|&nbsp;)+/gim
const extraRegex = /(\s,\s|,\s,|\s\s|\(|\)|\*\*\*)+/gim
const startRegex = /^(,\s*)+/gim
const endRegex = /(,\s*)+$/gim

export function getSpecies(species) {
  return species
    .replace(charsRegex, ' ')
    .replace(newLineRegex, ', ')
    .replace(extraRegex, ', ')
    .replace(extraRegex, ', ')
    .replace(startRegex, '')
    .replace(endRegex, '')
    .replace(/,,/gim, ',')
    .trim()
}

export function getDescription(description) {
  return description
    .replace(/\d/gim, '')
    .replace(charsRegex, ' ')
    .replace(newLineRegex, ', ')
    .replace(extraRegex, ', ')
    .replace(extraRegex, ', ')
    .replace(startRegex, '')
    .replace(endRegex, '')
    .trim()
}

export function getSeasonDates(seasonDates) {
  let seasonDatesHTML = seasonDates.replace(newLineRegex, '<br>')

  if (seasonDatesHTML.indexOf('<br>') >= 0) {
    let speciesSeasonDates = []
    let seasonDatesArray = []
    seasonDatesArray =
      seasonDatesHTML.indexOf('</p><p>') >= 0
        ? seasonDatesHTML.split('</p><p>')
        : seasonDatesHTML.split('<br>')

    _.each(seasonDatesArray, (value) => {
      let speciesSeasonDate = value
        .replace(charsRegex, '')
        .replace(newLineRegex, ', ')
        .replace(extraRegex, ', ')
        .replace(startRegex, '')
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
    .replace(newLineRegex, ', ')
    .replace(extraRegex, ', ')
    .replace(startRegex, '')
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
    .replace(newLineRegex, '')
    .replace(extraRegex, '')
    .replace('Only one fish may', ', Only one fish may ')
    .replace('Min:', '')
    .replace('" whole', '" whole, ')
    .replace('&gt;', '>')
    .replace('&lt;', '<')
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
    speciesSeasonInfo['description'] = getDescription(
      description.text ? description.text() : description
    )
      .replace(species, '')
      .replace(/^,\s?/gim, '')
      .trim()
  }

  if (seasonDates[0]) {
    speciesSeasonInfo['seasonDates'] = getSeasonDates(
      seasonDates.html ? seasonDates.html() : seasonDates
    )
  }
  if (seasonLimits[0]) {
    speciesSeasonInfo['seasonLimits'] = getSeasonLimits(
      seasonLimits.html ? seasonLimits.html() : seasonLimits
    )
  }
  if (minimumLength[0]) {
    speciesSeasonInfo['minimumLength'] = getMinimumLength(
      minimumLength.html ? minimumLength.html() : minimumLength
    )
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
