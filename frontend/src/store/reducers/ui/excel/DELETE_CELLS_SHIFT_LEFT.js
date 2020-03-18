import { getLastArea } from "./tools/area";

const DELETE_CELLS_SHIFT_LEFT = (state) => {
  const { 
    stagnantSelectionAreas,
    activeCellPosition,
    sheetCellData
  } = state;

  let newState = { ...state };

  let newSheetCellData = {};
  const { y1, y2, x1, x2 } = getLastArea(stagnantSelectionAreas, activeCellPosition);

  const shiftOffsetX = Math.abs(x1 - x2);
  const shiftStartX = Math.min(x1, x2);
  const shiftEndX = shiftStartX + shiftOffsetX + 1;

  const rowStart = Math.min(y1, y2);
  const rowEnd = Math.max(y1, y2);

  for(let row in sheetCellData) {
    const columns = sheetCellData[row];
    if(row < rowStart || row > rowEnd) {
      newSheetCellData[row] = columns;
    } else {
      for(let column in columns) {
        if(column < shiftStartX) {
          if(!newSheetCellData[row]) newSheetCellData[row] = {};
          newSheetCellData[row][column] = sheetCellData[row][column];
        } else if(column >= shiftEndX) {
          if(!newSheetCellData[row]) newSheetCellData[row] = {};
          const newColumnOffset = column - shiftOffsetX - 1;
          newSheetCellData[row][newColumnOffset] = sheetCellData[row][column];
        }
      }
    }
  }

  newState.sheetCellData = newSheetCellData;

  return newState;
};

export default DELETE_CELLS_SHIFT_LEFT;