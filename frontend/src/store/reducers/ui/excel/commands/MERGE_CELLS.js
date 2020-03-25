import cloneDeep from "clone-deep";

const MERGE_CELLS = (state) => {
  const {
    stagnantSelectionAreas,
    sheetCellData
  } = state;

  // Can only merge when there's only one area 
  if(stagnantSelectionAreas.length !== 1) return state;

  const { x1, y1, x2, y2 } = stagnantSelectionAreas[0];

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  let newSheetCellData = cloneDeep({ ...sheetCellData });

  for(let row = minY; row <= maxY; row++) {
    newSheetCellData[row] = { ...newSheetCellData[row] };

    let rowData = newSheetCellData[row];

    for(let column = minX; column <= maxX; column++) {
      const merged = { x1: minX, y1: minY, x2: maxX, y2: maxY };
      
      if(row !== minX && column !== minY) {
        rowData[column] = { merged };
      } else {
        rowData[column] = { ...rowData[column], merged }
      }
    }
  }

  const newState = {
    ...state,
    sheetCellData: newSheetCellData
  }

  return newState;
};

export default MERGE_CELLS;