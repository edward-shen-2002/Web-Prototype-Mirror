import { getLastArea } from "./tools/area";

const DELETE_CELLS_SHIFT_UP = (state) => {
  const { 
    stagnantSelectionAreas,
    activeCellPosition
  } = state;

  let newState = { ...state };

  let newSheetCellData = {};

  const { y1, y2, x1, x2 } = getLastArea(stagnantSelectionAreas, activeCellPosition);

  const shiftOffsetY = Math.abs(y1 - y2);
  const shiftStartY = Math.min(y1, y2);
  const shiftEndY = shiftStartY + shiftOffsetY + 1;

  const columnStart = Math.min(x1, x2);
  const columnEnd = Math.max(x1, x2);

  let newSheetCellData = { ...newSheetCellData };

  for(let row in newSheetCellData) {
    const columns = newSheetCellData[row];

    if(row < shiftStartY) {
      newSheetCellData[row] = columns;
    } else {
      for(let column in columns) {
        if(row >= shiftEndY && column >= columnStart && column <= columnEnd) {
          const newRowOffset = row - shiftOffsetY - 1;
          if(!newSheetCellData[newRowOffset]) newSheetCellData[newRowOffset] = {};
          newSheetCellData[newRowOffset][column] = newSheetCellData[row][column];
        } else if(column < columnStart || column > columnEnd) {
          if(!newSheetCellData[row]) newSheetCellData[row] = {};
          newSheetCellData[row][column] = newSheetCellData[row][column];
        }
      }
    } 
  }

  newState.sheetCellData = newSheetCellData;

  return newState;
};

export default DELETE_CELLS_SHIFT_UP;
