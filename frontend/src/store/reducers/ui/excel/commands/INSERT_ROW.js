import {
  getInsertData,
  offsetObjectAtIndex,
  offsetSheetCellRowDataAtIndex
} from "../tools/offset";

const INSERT_ROW = (state) => {
  const {
    sheetGridRef,
    activeCellPosition,
    sheetCellData,
    sheetRowHeights,
    sheetHiddenRows,
    sheetRowCount,
    stagnantSelectionAreas
  } = state;

  let newState = { ...state };

  const { insertCount, insertStart } = getInsertData("y", stagnantSelectionAreas, activeCellPosition);

  newState.sheetRowCount = sheetRowCount + insertCount;
  newState.sheetCellData = offsetSheetCellRowDataAtIndex(sheetCellData, insertStart, insertCount);
  newState.sheetRowHeights = offsetObjectAtIndex(sheetRowHeights, insertStart, insertCount);
  newState.sheetHiddenRows = offsetObjectAtIndex(sheetHiddenRows, insertStart, insertCount);

  sheetGridRef.current.resetAfterRowIndex(insertStart);
};

export default INSERT_ROW;