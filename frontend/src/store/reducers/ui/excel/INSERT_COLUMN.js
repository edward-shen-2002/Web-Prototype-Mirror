import {
  getInsertData,
  offsetObjectAtIndex,
  offsetSheetCellColumnDataAtIndex
} from "./tools/offset";

const INSERT_COLUMN = (state) => {
  const {
    sheetGridRef,
    activeCellPosition,
    sheetCellData,
    sheetColumnWidths,
    sheetHiddenColumns,
    sheetColumnCount,
    stagnantSelectionAreas
  } = state;

  let newState = { ...state };

  const { insertCount, insertStart } = getInsertData("x", stagnantSelectionAreas, activeCellPosition);

  newState.sheetColumnCount = sheetColumnCount + insertCount;

  newState.sheetCellData = offsetSheetCellColumnDataAtIndex(sheetCellData, insertStart, insertCount);
  newState.sheetColumnWidths = offsetObjectAtIndex(sheetColumnWidths, insertStart, insertCount);
  newState.sheetHiddenColumns = offsetObjectAtIndex(sheetHiddenColumns, insertStart, insertCount);

  sheetGridRef.current.resetAfterColumnIndex(insertStart);
  
  return newState;
};

export default INSERT_COLUMN;