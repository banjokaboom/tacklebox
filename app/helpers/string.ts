export function convertArrayToCommaSeparatedString(arr: string[]) {
  let str = ''
  arr.forEach(function (arrStr, index) {
    str += arrStr
    if (index < arr.length - 1) {
      str += ', '
    }
  })

  return str
}
