import {
  STYLE_SELECTION_BORDER_COLOR,
  STYLE_SELECTION_BORDER_WIDTH,

  STYLE_ACTIVE_SELECTION_BORDER_STYLE,
  STYLE_STAGNANT_SELECTION_BORDER_STYLE
} from "constants/styles";

export const computeSelectionAreaStyle = (SheetInstance, selectionArea, freezeColumnCount, freezeRowCount, isActive) => {
  let borderStyle = isActive ? STYLE_ACTIVE_SELECTION_BORDER_STYLE : STYLE_STAGNANT_SELECTION_BORDER_STYLE;
  let selectionAreaWidth;
  let selectionAreaHeight;
  let left;
  let top;

  const { x1, y1, x2, y2 } = selectionArea;

  let customSelectionStyle = {
    borderBottomWidth: STYLE_SELECTION_BORDER_WIDTH,
    borderBottomColor: STYLE_SELECTION_BORDER_COLOR,
    borderBottomStyle: borderStyle,
    borderRightWidth: STYLE_SELECTION_BORDER_WIDTH,
    borderRightColor: STYLE_SELECTION_BORDER_COLOR,
    borderRightStyle: borderStyle
  };

  const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = SheetInstance._getItemStyle(y1, x1);
  const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = SheetInstance._getItemStyle(y2, x2);

  const { top: topFrozenEnd, left: leftFrozenEnd, width: widthFrozenEnd, height: heightFrozenEnd } = SheetInstance._getItemStyle(freezeRowCount, freezeColumnCount);

  if(freezeColumnCount && (x1 <= freezeColumnCount || x2 <= freezeColumnCount)) {
    left = leftFrozenEnd + widthFrozenEnd;

    if(x1 <= x2) {
      selectionAreaWidth = leftEnd + widthEnd - left;
    } else {
      selectionAreaWidth = leftStart + widthStart - left;
    }
  } else {
    if(x1 <= x2) {
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

  if(freezeRowCount && (y1 <= freezeRowCount || y2 <= freezeRowCount)) {
    top = topFrozenEnd + heightFrozenEnd;

    if(y1 <= y2) {
      selectionAreaHeight = topEnd + heightEnd - top;
    } else {
      selectionAreaHeight = topStart + heightStart - top;
    }
  } else {
    if(y1 <= y2) {
      selectionAreaHeight = topEnd + heightEnd - topStart;
      top = topStart;
    } else {
      selectionAreaHeight = topStart + heightStart - topEnd;
      top = topEnd;
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