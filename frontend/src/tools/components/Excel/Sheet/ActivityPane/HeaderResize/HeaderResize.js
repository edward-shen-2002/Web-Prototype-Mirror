import React, { useMemo } from "react";

import { connect } from "react-redux";

import { getTopOffsets, getLeftOffsets, getNormalRowHeight, getNormalColumnWidth } from "tools/excel";

import { DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER, DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER } from "constants/excel";

import "./HeaderResize.scss";

// const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
// const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

const mapRowHeaderStateToProps = ({
  ui: {
    excel: {
      isRowResizeMode,
      rowResizeData,
      sheetRowHeights, 
      sheetFreezeRowCount,
      sheetFreezeColumnCount,
      sheetRowCount
    }
  }
}) => ({
  isRowResizeMode,
  rowResizeData,
  sheetRowHeights, 
  sheetFreezeRowCount,
  sheetFreezeColumnCount,
  sheetRowCount
});

export let RowHeaderIndicator = ({
  isRowResizeMode,
  isRelevantRowOffset,
  rowResizeData,
  sheetFreezeRowCount,
  sheetRowHeights, 
  sheetRowCount,

  computeTopOffset
}) => {
  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
  
  if(!isRowResizeMode) return null;

  const freezeRowOffset = topOffsets[sheetFreezeRowCount] + getNormalRowHeight(sheetRowHeights[sheetFreezeRowCount]);
  const { offset } = rowResizeData;

  if(!isRelevantRowOffset(offset, freezeRowOffset)) return null;

  const indicatorStyle = {
    top: computeTopOffset ? computeTopOffset(offset, freezeRowOffset) : offset,
    left: 0,
    width: DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER,
    height: 4 
  };

  return <div style={indicatorStyle} className="resizeHeader resizeHeader__headerIndicator"/>;
};

RowHeaderIndicator = connect(mapRowHeaderStateToProps)(RowHeaderIndicator);

const mapColumnHeaderStateToProps = ({
  ui: {
    excel: {
      isColumnResizeMode,
      columnResizeData,
      sheetFreezeColumnCount,
      sheetColumnWidths,
      sheetColumnCount
    }
  }
}) => ({
  isColumnResizeMode,
  columnResizeData,
  sheetFreezeColumnCount,
  sheetColumnWidths,
  sheetColumnCount
});

export let ColumnHeaderIndicator = ({
  isColumnResizeMode,
  isRelevantColumnOffset,
  columnResizeData,
  sheetFreezeColumnCount,
  sheetColumnWidths,
  sheetColumnCount
}) => {
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

  if(!isColumnResizeMode) return null;

  const freezeColumnOffset = leftOffsets[sheetFreezeColumnCount] + getNormalColumnWidth(sheetColumnWidths[sheetFreezeColumnCount]);
  const { offset } = columnResizeData;

  if(!isRelevantColumnOffset(offset, freezeColumnOffset)) return null;

  const indicatorStyle = {
    top: 0,
    left: offset,
    width: 4,
    height: DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER
  };

  return <div style={indicatorStyle} className="resizeHeader resizeHeader__headerIndicator"/>;
};

ColumnHeaderIndicator = connect(mapColumnHeaderStateToProps)(ColumnHeaderIndicator);

export let RowContentIndicator = ({

}) => {

  return (
    <div>

    </div>
  );
};

export let ColumnContentIndicator = ({

}) => {

  return (
    <div>

    </div>
  );
};
