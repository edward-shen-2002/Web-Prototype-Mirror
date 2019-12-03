import React, { Fragment } from "react";

import CommonActivityPane from "./CommonActivityPane";

import { RowHeaderSelection } from "./HeaderSelection";

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
    borderLeftWidth: STYLE_SELECTION_BORDER_WIDTH,
    borderLeftColor: STYLE_SELECTION_BORDER_COLOR,
    borderLeftStyle: borderStyle,
    borderBottomWidth: STYLE_SELECTION_BORDER_WIDTH,
    borderBottomColor: STYLE_SELECTION_BORDER_COLOR,
    borderBottomStyle: borderStyle
  };

  const topStart = topOffsets[y1];
  const leftStart = leftOffsets[x1];
  const widthStart = columnWidths[x1];
  const heightStart = rowHeights[y1];

  const topEnd = topOffsets[y2];
  const leftEnd = leftOffsets[x2];
  const widthEnd = columnWidths[x2];
  const heightEnd = rowHeights[y2];

  const topFrozenEnd = topOffsets[freezeRowCount];
  const leftFrozenEnd = leftOffsets[freezeColumnCount];
  const widthFrozenEnd = columnWidths[freezeColumnCount];
  const heightFrozenEnd = rowHeights[freezeRowCount];

  const minLeft = x1 < x2 ? leftStart : leftEnd;
  left = minLeft;

  if(x1 > freezeColumnCount || x2 > freezeColumnCount) {
    selectionAreaWidth = leftFrozenEnd + widthFrozenEnd - minLeft;
  } else {
    if(x1 < x2) {
      selectionAreaWidth = leftEnd + widthEnd - minLeft;
    } else {
      selectionAreaWidth = leftStart + widthStart - minLeft;
    }

    customSelectionStyle.borderRightWidth = STYLE_SELECTION_BORDER_WIDTH;
    customSelectionStyle.borderRightColor = STYLE_SELECTION_BORDER_COLOR;
    customSelectionStyle.borderRightColor = STYLE_SELECTION_BORDER_COLOR;
    customSelectionStyle.borderRightStyle = borderStyle;
  }

  if(freezeRowCount && (y1 <= freezeRowCount || y2 <= freezeRowCount)) {
    top = 0;

    if(y1 < y2) {
      selectionAreaHeight = topEnd + heightEnd - topFrozenEnd - heightFrozenEnd;
    } else {
      selectionAreaHeight = topStart + heightStart - topFrozenEnd - heightFrozenEnd;
    }
  } else {
    if(y1 < y2) {
      top = topStart - topFrozenEnd - heightFrozenEnd;
      selectionAreaHeight = topEnd + heightEnd - topStart;
    } else {
      top = topEnd - topFrozenEnd - heightFrozenEnd;
      selectionAreaHeight = topStart + heightStart - topEnd;
    }

    customSelectionStyle.borderTopWidth = STYLE_SELECTION_BORDER_WIDTH;
    customSelectionStyle.borderTopColor = STYLE_SELECTION_BORDER_COLOR;
    customSelectionStyle.borderTopStyle = borderStyle;
  }

  customSelectionStyle.left = left;
  customSelectionStyle.top = top;
  customSelectionStyle.width = selectionAreaWidth;
  customSelectionStyle.height = selectionAreaHeight;
  customSelectionStyle.display = null;

  return customSelectionStyle;
};

const computeActiveCellStyle = (x, y, columnWidths, leftOffsets, rowHeights, topOffsets, _sheetFreezeColumnCount, sheetFreezeRowCount) => {
  let activeCellStyle = { top: topOffsets[y], left: leftOffsets[x], height: rowHeights[y], width: columnWidths[x] };

  let topFreeze = topOffsets[sheetFreezeRowCount];
  let heightFreeze = rowHeights[sheetFreezeRowCount];

  activeCellStyle.top = activeCellStyle.top - topFreeze - heightFreeze;

  return activeCellStyle;
};

const BottomLeftActivityPane = ({ 
  handleChangeActiveInputValue 
}) => {
  const isActiveCellInCorrectPane = (x, y, sheetFreezeColumnCount, sheetFreezeRowCount) => (x <= sheetFreezeColumnCount && y > sheetFreezeRowCount);
  const isRelevantArea = (x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount) => ((x1 <= sheetFreezeColumnCount || x2 <= sheetFreezeColumnCount) && (y1 > sheetFreezeRowCount || y2 > sheetFreezeRowCount));

  return (
    <Fragment>
      <CommonActivityPane
        isActiveCellInCorrectPane={isActiveCellInCorrectPane}
        isRelevantArea={isRelevantArea}
        computeActiveCellStyle={computeActiveCellStyle}
        computeSelectionAreaStyle={computeSelectionAreaStyle}
        handleChangeActiveInputValue={handleChangeActiveInputValue}
      />
      <RowHeaderSelection/>
    </Fragment>
  );
};

export default BottomLeftActivityPane;