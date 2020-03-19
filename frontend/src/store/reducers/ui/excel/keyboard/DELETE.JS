import { getAllAreas } from "../tools/area";

const DELETE = (
  state
) => {
  let { 
    isEditMode,

    sheetCellData
  } = state;

  if(isEditMode) return state;

  let newState = { ...state };

  let selectionAreaCoveredCells = getAllAreas(newState);

  let newSheetCellData = { ...sheetCellData };

  for(let row in selectionAreaCoveredCells) {
    let columns = Object.keys(selectionAreaCoveredCells[row]);

    columns.forEach((column) => {
      // ! Consider when everything is undefined -- do you remove it from sheet data?
      // ! Consider normal/rich text
      if(newSheetCellData[row] && newSheetCellData[row][column]) {
        newSheetCellData[row][column] = { 
          ...newSheetCellData[row][column], 
          value: undefined,
          type: "normal"
        };
      }
    });
  }

  newState.sheetCellData = newSheetCellData;

  CustomEditor.clearEditor(newState.activeCellInputData.formulaEditor)
  CustomEditor.clearEditor(newState.activeCellInputData.cellEditor);

  newState.activeCellInputData = { 
    ...newState.activeCellInputData,
    cellValue: createEmptyEditorValue(),
    formulaValue: createEmptyEditorValue()
  };

  return newState;
};

export default DELETE;