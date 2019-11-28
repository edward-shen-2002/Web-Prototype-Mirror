import {
  STYLE_SELECTION_BORDER_COLOR,
  STYLE_SELECTION_BORDER_WIDTH,

  STYLE_ACTIVE_SELECTION_BORDER_STYLE,
  STYLE_STAGNANT_SELECTION_BORDER_STYLE
} from "constants/styles";

export const computeSelectionAreaStyle = (sheetCelloffsets, selectionArea, freezeColumnCount, freezeRowCount, isActive) => {
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
    borderTopWidth: STYLE_SELECTION_BORDER_WIDTH,
    borderTopColor: STYLE_SELECTION_BORDER_COLOR,
    borderTopStyle: borderStyle
  };

  const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = sheetCelloffsets[y1][x1];
  const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = sheetCelloffsets[y2][x2];

  const { top: topFrozenEnd, left: leftFrozenEnd, width: widthFrozenEnd, height: heightFrozenEnd } = sheetCelloffsets[freezeRowCount][freezeColumnCount];

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
    customSelectionStyle.borderRightStyle = borderStyle;
  }

  const minTop = y1 < y2 ? topStart : topEnd;
  top = minTop;

  if(y1 > freezeRowCount || y2 > freezeRowCount) {
    if(y1 < y2) {
      selectionAreaHeight = topFrozenEnd + heightFrozenEnd - minTop;
    } else {
      selectionAreaHeight = topFrozenEnd + heightFrozenEnd - minTop;
    }
  } else {
    if(y1 < y2) {
      selectionAreaHeight = topEnd + heightEnd - minTop;
    } else {
      selectionAreaHeight = topStart + heightStart - minTop;
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