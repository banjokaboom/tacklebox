/**
 *  Parses date range from passes string and compares to see if today is between the range
 *
 *  @param dates String
 **/
export function compareDates(dates) {
  let today = new Date()
  let endsInYearRegex = /\d{4}$/
  let isDateInRange = false

  let splitDates = dates.split(/\s\W{1}\s/)

  if (splitDates.length > 1) {
    let firstDateStr = splitDates[0].replace('.', '').trim()
    let secondDateStr = splitDates[1].replace('.', '').trim()

    if (
      endsInYearRegex.test(secondDateStr) &&
      !endsInYearRegex.test(firstDateStr)
    ) {
      firstDateStr += ' ' + secondDateStr.substring(secondDateStr.length - 4)
    } else {
      firstDateStr += ' ' + today.getFullYear()
      secondDateStr += ' ' + today.getFullYear()
    }

    let firstDate = new Date(firstDateStr)
    let secondDate = new Date(secondDateStr)

    if (firstDate.getTime() > secondDate.getTime()) {
      secondDate.setFullYear(today.getFullYear() + 1)
    }

    isDateInRange =
      today.getTime() >= firstDate.getTime() &&
      today.getTime() < secondDate.getTime()
  } else if (
    dates.trim().toUpperCase() == 'ALL YEAR' ||
    dates.trim().toUpperCase() == 'YEAR ROUND'
  ) {
    isDateInRange = true
  }

  return isDateInRange
}

export function getSeasons() {
  const today = new Date()
  let seasons = []

  switch (today.getMonth() + 1) {
    case 1:
    case 2:
      seasons.push('winter')
      break
    case 3:
      seasons.push('winter', 'spring')
      break
    case 4:
    case 5:
      seasons.push('spring')
      break
    case 6:
      seasons.push('spring', 'summer')
      break
    case 7:
    case 8:
      seasons.push('summer')
      break
    case 9:
      seasons.push('summer', 'fall')
      break
    case 10:
    case 11:
      seasons.push('fall')
      break
    case 12:
      seasons.push('fall', 'winter')
      break
    default:
      break
  }

  return seasons
}
