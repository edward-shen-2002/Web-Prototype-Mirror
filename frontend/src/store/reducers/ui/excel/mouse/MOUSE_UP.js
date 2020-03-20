import { 
  getNormalColumnWidth,
  getNormalRowHeight,
  getExcelColumnWidth,
  getExcelRowHeight
} from "@tools/excel";

import leftOffsetsSelector from "@selectors/ui/excel/leftOffsets";
import topOffsetsSelector from "@selectors/ui/excel/topOffsets";

const MOUSE_UP = (
  state, 
  { 
    sheetGridRef,
    ctrlKey
  }
) => {
  const { 
    isSelectionMode, 
    cursorType,

    columnResizeData,
    rowResizeData,
    freezeColumnResizeData,
    freezeRowResizeData,

    sheetFreezeColumnCount,
    sheetFreezeRowCount,

    sheetRowHeights,
    sheetColumnWidths,

    scrollData,

    activeSelectionArea, 
    stagnantSelectionAreas
  } = state;

  let newState = { ...state };

  const leftOffsets = leftOffsetsSelector(newState);
  const topOffsets = topOffsetsSelector(newState);
  
  if(isSelectionMode) {
    newState.isSelectionMode = false;

    if(activeSelectionArea) {
      const { x1, y1, x2, y2 } = activeSelectionArea;
  
      if((x1 !== x2 || y1 !== y2) || ctrlKey) {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);

        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        // Cut the first superset stagnant selection area
        const supersetIndex = stagnantSelectionAreas.findIndex(({ x1: sX1, x2: sX2, y1: sY1, y2: sY2 }) => {
          const minSX = Math.min(sX1, sX2);
          const maxSX = Math.max(sX1, sX2);

          const minSY = Math.min(sY1, sY2);
          const maxSY = Math.max(sY1, sY2);

          const isXContained = minSX <= minX && maxX <= maxSX;
          const isYContained = minSY <= minY && maxY <= maxSY;

          return isXContained && isYContained; 
        });

        if(supersetIndex >= 0) {
          const { x1: sX1, x2: sX2, y1: sY1, y2: sY2 } = stagnantSelectionAreas[supersetIndex];
          const minSX = Math.min(sX1, sX2);
          const midLeftSX = minX;
          const midRightSX = maxX;
          const maxSX = Math.max(sX1, sX2);

          const minSY = Math.min(sY1, sY2);
          const midTopSY = minY;
          const midBottomSY = maxY;
          const maxSY = Math.max(sY1, sY2);

          let newAreas = [];

          if(minSY !== midTopSY) newAreas.push({ x1: minSX, x2: maxSX, y1: minSY, y2: midTopSY - 1 });
          if(minSX !== midLeftSX) newAreas.push({ x1: minSX, x2: midLeftSX - 1, y1: midTopSY, y2: midBottomSY });
          if(maxSX !== midRightSX) newAreas.push({ x1: midRightSX + 1, x2: maxSX, y1: midTopSY, y2: midBottomSY });
          if(maxSY !== midBottomSY) newAreas.push({ x1: minSX, x2: maxSX, y1: midBottomSY + 1, y2: maxSY });

          newState.stagnantSelectionAreas = [ 
            ...stagnantSelectionAreas.slice(0, supersetIndex), 
            ...newAreas, 
            ...stagnantSelectionAreas.slice(supersetIndex + 1) 
          ];

          const isNewAreasPresent = newAreas.length;
          const isNewStagnantAreasPresent = newState.stagnantSelectionAreas.length;

          if(isNewAreasPresent || isNewStagnantAreasPresent) {
            let focusedArea;
            let activeCellSelectionareaIndex;

            if(isNewAreasPresent) {
              activeCellSelectionareaIndex = supersetIndex;
              focusedArea = newAreas;
            } else {
              activeCellSelectionareaIndex = 0;
              focusedArea = newState.stagnantSelectionAreas;
            }

            const { x1, x2, y1, y2 } = focusedArea[0];

            const newX = Math.min(x1, x2);
            const newY = Math.min(y1, y2);

            newState.activeCellPosition = { x: newX, y: newY };
            newState.activeCellSelectionareaIndex = activeCellSelectionareaIndex;
          }
        } else {
          newState.stagnantSelectionAreas = [ ...stagnantSelectionAreas, activeSelectionArea ];
          newState.activeCellSelectionareaIndex = newState.stagnantSelectionAreas.length - 1;
        }
      } else {
        newState.activeCellSelectionareaIndex = -1;
      }

      newState.activeSelectionArea = null;
    } else if(!ctrlKey) {
      newState.activeCellSelectionareaIndex = -1;
    } 
  } else if(cursorType) {
    newState.cursorType = "default";

    if(rowResizeData) {
      const { row, offset } = rowResizeData;
      const rowTopOffset = topOffsets[row];
      const { scrollTop } = scrollData;

      const sheetFreezeRowEndOffset = topOffsets[sheetFreezeRowCount] + (sheetFreezeRowCount ? getNormalRowHeight(sheetRowHeights[sheetFreezeRowCount]) : DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER);

      const rowHeight = getNormalRowHeight(sheetRowHeights[row]);
      const currentOffset = rowTopOffset + rowHeight;
      
      let newRowHeight = offset - rowTopOffset;

      if(row <= sheetFreezeRowCount && offset > sheetFreezeRowEndOffset) newRowHeight -= scrollTop;

      if(offset !== currentOffset) {
        newState.sheetRowHeights = { ...sheetRowHeights, [row]: getExcelRowHeight(newRowHeight) };
        sheetGridRef.current.resetAfterRowIndex(row);
      } 
      
      newState.rowResizeMode = false;
      newState.rowResizeData = null;
    } else if(columnResizeData) {
      const { column, offset } = columnResizeData;
      const { scrollLeft } = scrollData;

      const sheetFreezeColumnEndOffset = leftOffsets[sheetFreezeColumnCount] + (sheetFreezeColumnCount ? getNormalColumnWidth(sheetColumnWidths[sheetFreezeColumnCount]) : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER);

      const columnLeftOffset = leftOffsets[column];
      const columnWidth = getNormalColumnWidth(sheetColumnWidths[column]);
      const currentOffset = columnLeftOffset + columnWidth;

      let newColumnWidth = offset - columnLeftOffset;

      if(column <= sheetFreezeColumnCount && offset > sheetFreezeColumnEndOffset) newColumnWidth -= scrollLeft;

      if(offset !== currentOffset) {
        newState.columnWidths = { ...sheetColumnWidths, [column]: getExcelColumnWidth(newColumnWidth) };
        sheetGridRef.current.resetAfterColumnIndex(column);
      }

      newState.columnResizeMode = false;
      newState.columnResizeData = null;
    } else if(freezeRowResizeData) {

    } else if(freezeColumnResizeData) {

    }
  }

  return newState;
};

export default MOUSE_UP;