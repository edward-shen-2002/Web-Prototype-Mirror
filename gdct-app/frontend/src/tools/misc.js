export const isObjectEmpty = (object) => {
  for (let key in object) {
    if (object.hasOwnProperty(key)) return false
  }

  return true
}

export const DnDReorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
