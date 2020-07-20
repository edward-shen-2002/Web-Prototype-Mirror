import { getAllAreas } from '../tools/area'
import {
  CustomEditor,
  createEmptyEditorValue,
} from '../../../../../tools/slate'

const DELETE = (state) => {
  let {
    isEditMode,

    sheetCellData,
  } = state

  if (isEditMode) return state

  let newState = { ...state }

  let selectionAreaCoveredCells = getAllAreas(newState)

  let newSheetCellData = { ...sheetCellData }

  for (let row in selectionAreaCoveredCells) {
    let columns = Object.keys(selectionAreaCoveredCells[row])

    let rowData = { ...newSheetCellData[row] }

    if (rowData) {
      columns.forEach((column) => {
        // ! Consider when everything is undefined -- do you remove it from sheet data?
        // ! Consider normal/rich text

        if (rowData[column]) {
          rowData[column] = {
            ...rowData[column],
            value: undefined,
            type: 'normal',
          }
        }
      })

      newSheetCellData[row] = rowData
    }
  }

  newState.sheetCellData = newSheetCellData

  CustomEditor.clearEditor(newState.activeCellInputData.formulaEditor)
  CustomEditor.clearEditor(newState.activeCellInputData.cellEditor)

  newState.activeCellInputData = {
    ...newState.activeCellInputData,
    cellValue: createEmptyEditorValue(),
    formulaValue: createEmptyEditorValue(),
  }

  return newState
}

export default DELETE
