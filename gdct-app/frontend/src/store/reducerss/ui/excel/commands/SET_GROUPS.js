const SET_GROUPS = (
  state,
  { id, columnName, category, newGroups, selectedCOAIds }
) => {
  let {
    sheetCellData,
    activeCellPosition: { y, x },
  } = state

  let newState = { ...state }

  let newSheetCellData = { ...sheetCellData }

  // ! TODO
  if (category === 'attribute') {
    console.log('id', id)
    newSheetCellData[1] = { ...newSheetCellData[1], [x]: { value: id } }
    newSheetCellData[8] = { ...newSheetCellData[8], [x]: { value: columnName } }
  } else {
    let groupValues = newGroups.map(({ value }) => value).join(' - ')

    newSheetCellData[y] = { ...newSheetCellData[y] }

    // if(selectedCOAIds.length) {
    //   selectedCOAIds.forEach((id, index) => {

    //   })
    // }

    // newSheetCellData[y][1] = { value: selectedCOAId }
    newSheetCellData[y][2] = { value: newGroups[newGroups.length - 1]._id }
    newSheetCellData[y][3] = { value: groupValues }
  }

  newState.sheetCellData = newSheetCellData
  newState.activeCellDialog = ''

  return newState
}

export default SET_GROUPS
