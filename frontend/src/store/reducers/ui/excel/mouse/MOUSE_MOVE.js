import { 
  getScrollbarSize, 
  getNormalColumnWidth,
  getNormalRowHeight
} from "@tools/excel";

const MOUSE_MOVE = (
  state,
  {
    xOffset, 
    yOffset
  }) => {
  const { 
    topOffsets,
    leftOffsets,
    sheetRowHeights,
    sheetColumnWidths,
    isSelectionMode,
    scrollData,
    sheetFreezeColumnCount,
    sheetFreezeRowCount,
    rowResizeData,
    columnResizeData,
    freezeRowResizeData,
    freezeColumnResizeData,
    isColumnResizeMode,
    isFreezeColumnResizeMode,
    isRowResizeMode,
    isFreezeRowResizeMode
    
  } = state;

  if(
    isSelectionMode
    || (
      !isColumnResizeMode
      && !isFreezeColumnResizeMode
      && !isRowResizeMode
      && !isFreezeRowResizeMode
    )
  ) return state;

  let newState = { ...state };

  let { scrollTop, scrollLeft } = scrollData;

  if(isRowResizeMode) {
    const { row } = rowResizeData;
    const rowOffset = topOffsets[row];
    const { clientHeight } = window.sheetContainerRef.current;
    const freezeRowOffset = topOffsets[sheetFreezeRowCount] + (sheetFreezeRowCount ? getNormalRowHeight(sheetRowHeights[sheetFreezeRowCount]) : DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER);

    const componentOffset = window.sheetContainerRef.current.offsetTop;

    const scrollbarSize = getScrollbarSize();

    // Do not consider scroll offset when freeze
    let adjustedScrollOffset = row <= sheetFreezeRowCount ? 0 : scrollTop; 
  
    const minScrollOffset = adjustedScrollOffset;
    const maxScrollOffset = adjustedScrollOffset + clientHeight - scrollbarSize;
  
    const possibleMaxOffset = Math.max(rowOffset, maxScrollOffset);
    const possibleMinOffset = Math.max(rowOffset, minScrollOffset);
  
    let adjustedOffset = yOffset + adjustedScrollOffset - componentOffset;
  
    if(adjustedOffset < possibleMinOffset) {
      adjustedOffset = possibleMinOffset;
    } else if(adjustedOffset > possibleMaxOffset) {
      adjustedOffset = possibleMaxOffset;
    };

    if(adjustedOffset > freezeRowOffset && row <= sheetFreezeRowCount) adjustedOffset += scrollTop;
  
    
    newState.rowResizeData = { ...newState.rowResizeData, offset: adjustedOffset };
  } else if(isColumnResizeMode) {
    const { column } = columnResizeData;
    const columnOffset = leftOffsets[column];
    const freezeColumnOffset = leftOffsets[sheetFreezeColumnCount] + (sheetFreezeColumnCount ? getNormalColumnWidth(sheetColumnWidths[sheetFreezeColumnCount]) : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER);

    const { clientWidth } = window.sheetContainerRef.current;

    const componentOffset = window.sheetContainerRef.current.offsetLeft;

    const scrollbarSize = getScrollbarSize();

    // Do not consider scroll offset when freeze
    let adjustedScrollOffset = column <= sheetFreezeColumnCount ? 0 : scrollLeft; 
  
    const minScrollOffset = adjustedScrollOffset;
    const maxScrollOffset = adjustedScrollOffset + clientWidth - scrollbarSize;
  
    const possibleMaxOffset = Math.max(columnOffset, maxScrollOffset);
    const possibleMinOffset = Math.max(columnOffset, minScrollOffset);
  
    let adjustedOffset = xOffset + adjustedScrollOffset - componentOffset;
  
    if(adjustedOffset < possibleMinOffset) {
      adjustedOffset = possibleMinOffset;
    } else if(adjustedOffset > possibleMaxOffset) {
      adjustedOffset = possibleMaxOffset;
    };

    if(adjustedOffset > freezeColumnOffset && column <= sheetFreezeColumnCount) {
      adjustedOffset += scrollLeft;
    }

    newState.columnResizeData = { ...newState.columnResizeData, offset: adjustedOffset };
  } else if(isFreezeRowResizeMode) {

  } else if(isFreezeColumnResizeMode) {

  } 
  
  return newState;
};

export default MOUSE_MOVE;