import { getRandomNumberFromRange } from "./system.helper.ts";


export function getRandomHEX() {
  const red = getRandomNumberFromRange(0, 256)
  const green = getRandomNumberFromRange(0, 256)
  const blue = getRandomNumberFromRange(0, 256)

  const redConvertedToHEX = convertNumberToHEX(red)
  const greenConvertedToHEX = convertNumberToHEX(green)
  const blueConvertedToHEX = convertNumberToHEX(blue)

  return '#' + redConvertedToHEX + greenConvertedToHEX + blueConvertedToHEX
}

export function convertNumberToHEX(number: number) {
  let convertedNumber = number.toString(16)

  if (number < 16) {
    convertedNumber = '0' + convertedNumber
  }

  return convertedNumber
}
