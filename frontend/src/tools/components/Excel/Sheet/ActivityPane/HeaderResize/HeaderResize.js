import React from "react";

import { connect } from "react-redux";

import { getNormalRowHeight, getNormalColumnWidth } from "@tools/excel";

import { DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER, DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER } from "@constants/excel";

import topOffsetsSelector from "@selectors/ui/excel/topOffsets";
import leftOffsetsSelector from "@selectors/ui/excel/leftOffsets";

import "./HeaderResize.scss";

const mapRowHeaderStateToProps = ({
  ui: {
    excel: {
      present: {
        isRowResizeMode,
        rowResizeData,
        sheetRowHeights, 
        sheetFreezeRowCount,
        sheetFreezeColumnCount,
        sheetRowCount
      }
    }
  }
}) => ({
  isRowResizeMode,
  rowResizeData,
  sheetRowHeights, 
  sheetFreezeRowCount,
  sheetFreezeColumnCount,
  sheetRowCount,

  topOffsets: topOffsetsSelector({ sheetRowCount, sheetRowHeights })
});

export let RowHeaderIndicator = ({
  isRowResizeMode,
  isRelevantRowOffset,
  rowResizeData,
  sheetFreezeRowCount,
  sheetRowHeights, 
  topOffsets,

  computeTopOffset
}) => {
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
      present: {
        isColumnResizeMode,
        columnResizeData,
        sheetFreezeColumnCount,
        sheetColumnWidths,
        sheetColumnCount
      }
    }
  }
}) => ({
  isColumnResizeMode,
  columnResizeData,
  sheetFreezeColumnCount,
  sheetColumnWidths,
  sheetColumnCount,

  leftOffsets: leftOffsetsSelector({ sheetColumnCount, sheetColumnWidths })
});

export let ColumnHeaderIndicator = ({
  isColumnResizeMode,
  isRelevantColumnOffset,
  columnResizeData,
  sheetFreezeColumnCount,
  sheetColumnWidths,
  leftOffsets
}) => {
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
