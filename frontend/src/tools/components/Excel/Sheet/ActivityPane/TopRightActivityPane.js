import React, { Fragment } from "react";

import CommonActivityPane from "./CommonActivityPane";

import { ColumnHeaderSelection } from "./HeaderSelection";

import {
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH,
  DEFAULT_EXCEL_SHEET_ROW_HEIGHT
} from "constants/excel";

import {
  STYLE_SELECTION_BORDER_COLOR,
  STYLE_SELECTION_BORDER_WIDTH,

  STYLE_ACTIVE_SELECTION_BORDER_STYLE,
  STYLE_STAGNANT_SELECTION_BORDER_STYLE
} from "constants/styles";

const computeSelectionAreaStyle = (columnWidths, leftOffsets, rowHeights, topOffsets, selectionArea, freezeColumnCount, freezeRowCount, isActive) => {
  const { x1, y1, x2, y2 } = selectionArea;

  let borderStyle = isActive ? STYLE_ACTIVE_SELECTION_BORDER_STYLE : STYLE_STAGNANT_SELECTION_BORDER_STYLE;
  let selectionAreaWidth;
  let selectionAreaHeight;
  let left;
  let top;

  let customSelectionStyle = {
    borderRightWidth: STYLE_SELECTION_BORDER_WIDTH,
    borderRightColor: STYLE_SELECTION_BORDER_COLOR,
    borderRightStyle: borderStyle,
    borderTopWidth: STYLE_SELECTION_BORDER_WIDTH,
    borderTopColor: STYLE_SELECTION_BORDER_COLOR,
    borderTopStyle: borderStyle
  };

  const topStart = topOffsets[y1];
  const leftStart = leftOffsets[x1];
  let widthStart = columnWidths[x1];
  let heightStart = rowHeights[y1];

  if(!widthStart) widthStart = DEFAULT_EXCEL_SHEET_COLUMN_WIDTH;
  if(!heightStart) heightStart = DEFAULT_EXCEL_SHEET_ROW_HEIGHT;

  const topEnd = topOffsets[y2];
  const leftEnd = leftOffsets[x2];
  let widthEnd = columnWidths[x2];
  let heightEnd = rowHeights[y2];

  if(!widthEnd) widthEnd = DEFAULT_EXCEL_SHEET_COLUMN_WIDTH;
  if(!heightEnd) heightEnd = DEFAULT_EXCEL_SHEET_ROW_HEIGHT;

  const topFrozenEnd = topOffsets[freezeRowCount];
  const leftFrozenEnd = leftOffsets[freezeColumnCount];
  let widthFrozenEnd = columnWidths[freezeColumnCount];
  let heightFrozenEnd = rowHeights[freezeRowCount];

  if(!widthFrozenEnd) widthFrozenEnd = DEFAULT_EXCEL_SHEET_COLUMN_WIDTH;
  if(!heightFrozenEnd) heightFrozenEnd = DEFAULT_EXCEL_SHEET_ROW_HEIGHT;
  
  if(freezeColumnCount && (x1 <= freezeColumnCount || x2 <= freezeColumnCount)) {
    left = leftFrozenEnd + widthFrozenEnd;

    if(x1 < x2) {
      selectionAreaWidth = leftEnd + widthEnd - left;
    } else {
      selectionAreaWidth = leftStart + widthStart - left;
    }
  } else {
    if(x1 < x2) {
      selectionAreaWidth = leftEnd + widthEnd - leftStart;
      left = leftStart;
    } else {
      selectionAreaWidth = leftStart + widthStart - leftEnd;
      left = leftEnd;
    }

    customSelectionStyle.borderLeftWidth = STYLE_SELECTION_BORDER_WIDTH;
    customSelectionStyle.borderLeftColor = STYLE_SELECTION_BORDER_COLOR;
    customSelectionStyle.borderLeftStyle = borderStyle;
  }

  const minTop = y1 < y2 ? topStart : topEnd;
  top = minTop;

  if(y1 > freezeRowCount || y2 > freezeRowCount) {
    selectionAreaHeight = topFrozenEnd + heightFrozenEnd - top;
  } else {
    if(y1 < y2) {
      selectionAreaHeight = topEnd + heightEnd - topStart;
    } else {
      selectionAreaHeight = topStart + heightStart - topEnd;
    }

    customSelectionStyle.borderBottomWidth = STYLE_SELECTION_BORDER_WIDTH;
    customSelectionStyle.borderBottomColor = STYLE_SELECTION_BORDER_COLOR;
    customSelectionStyle.borderBottomStyle = borderStyle;  
  }


  customSelectionStyle.left = left; 
  customSelectionStyle.top = top; 
  customSelectionStyle.width = selectionAreaWidth; 
  customSelectionStyle.height = selectionAreaHeight; 
  customSelectionStyle.display = null;
  
  return customSelectionStyle;
};

const TopRightActivityPane = ({ handleChangeActiveInputData }) => {
  const isActiveCellInCorrectPane = (x, y, sheetFreezeColumnCount, sheetFreezeRowCount) => (x > sheetFreezeColumnCount && y <= sheetFreezeRowCount);
  const isRelevantArea = (x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount) => ((x1 > sheetFreezeColumnCount || x2 > sheetFreezeColumnCount) && (y1 <= sheetFreezeRowCount || y2 <= sheetFreezeRowCount));

  return (
    <Fragment>
      <CommonActivityPane
        isActiveCellInCorrectPane={isActiveCellInCorrectPane}
        isRelevantArea={isRelevantArea}
        computeSelectionAreaStyle={computeSelectionAreaStyle}
        handleChangeActiveInputData={handleChangeActiveInputData}
      />
      <ColumnHeaderSelection/>
    </Fragment>
  );
};

export default TopRightActivityPane;