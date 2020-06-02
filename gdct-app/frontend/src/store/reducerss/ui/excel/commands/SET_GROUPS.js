const SET_GROUPS = (state, { category, newGroups }) => {
  let {
    sheetCellData,
    activeCellPosition: { y },
  } = state

  let newState = { ...state }

  let newSheetCellData = { ...sheetCellData }

  // ! TODO
  if (category === 'attribute') {
  } else {
    let groupValues = newGroups.map(({ value }) => value).join(' - ')

    newSheetCellData[y] = { ...newSheetCellData[y] }

    newSheetCellData[y][2] = { value: newGroups[newGroups.length - 1]._id }
    newSheetCellData[y][3] = { value: groupValues }

    newState.sheetCellData = newSheetCellData
    newState.activeCellDialog = ''
  }

  return newState
}

export default SET_GROUPS
