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
  } else if (dates.trim().toUpperCase() == 'ALL YEAR') {
    isDateInRange = true
  }

  return isDateInRange
}
