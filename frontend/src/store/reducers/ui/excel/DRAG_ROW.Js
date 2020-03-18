import { getNormalRowHeight } from "@tools/excel";

const DRAG_ROW = (
  state, 
  {
    row
  }
) => {
  const { 
    topOffsets,
    sheetRowHeights
  } = state;

  let newState = { ...state };
  
  const height = getNormalRowHeight(sheetRowHeights[row]);
  const rowOffset = topOffsets[row];
  const offset = rowOffset + height;

  newState.isRowResizeMode = true;
  newState.rowResizeData = { row, offset };
  newState.cursorType = "ns-resize";

  return newState;
};

export default DRAG_ROW;
