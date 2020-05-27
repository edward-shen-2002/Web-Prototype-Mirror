const SET_PREPOPULATE = (state, { type, quarter, year }) => {
  const { activeCellPosition, sheetCellData } = state

  if (!type && !quarter && !year) {
    console.error('No prepopulate parameters specified')
    return state
  }

  let prepopulateArray = []

  if (type) prepopulateArray.push(`type=${type}`)
  if (quarter) prepopulateArray.push(`quarter=${quarter}`)
  if (year) prepopulateArray.push(`year=${year}`)

  let newState = { ...state }

  const prepopulateString = `|${prepopulateArray.join('&')}`

  const { x, y } = activeCellPosition

  let newSheetCellData = { ...sheetCellData }

  if (!newSheetCellData[y]) newSheetCellData[y] = {}

  newSheetCellData[y][x] = {
    ...newSheetCellData[x],
    value: prepopulateString,
    type: 'prepopulate',
  }

  newState.sheetCellData = newSheetCellData
  newState.activeCellDialog = ''

  return newState
}

export default SET_PREPOPULATE
