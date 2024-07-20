export function createBlobAndGetURL (blobParts: BlobPart[], options: BlobPropertyBag) {
  const blob = new Blob(blobParts, options)

  return URL.createObjectURL(blob)
}

export function getRandomNumberFromRange(from: number, to: number) {
  return Math.floor(
    Math.random() * (to - from) + from
  )
}
