import React, { useEffect } from "react";

import { connect } from "react-redux";

import ActivityPane from "./ActivityPane";

import { STYLE_SELECTION_BORDER_WIDTH, STYLE_SELECTION_BORDER_COLOR } from "constants/styles";

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode, isEditMode } } }) => ({ selectionArea, isSelectionMode, isEditMode });

let BottomRightActivityPane = ({ 
  sheetRef, 
  selectionRef, 
  sheetContainerRef,
  selectionArea,
  isSelectionMode,
  freezeColumnCount,
  freezeRowCount,
  isEditMode
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;

    if((x1 <= freezeColumnCount && x2 <= freezeColumnCount) || (y1 <= freezeRowCount && y2 <= freezeRowCount)) {
      selectionRef.current.resetActiveCell();
      selectionRef.current.resetSelectionArea();

      return;
    }

    let borderStyle = isSelectionMode ? "dashed" : "solid";
    let selectionAreaWidth;
    let selectionAreaHeight;
    let left;
    let top;

    let customSelectionStyle = {
      borderBottomWidth: STYLE_SELECTION_BORDER_WIDTH,
      borderBottomColor: STYLE_SELECTION_BORDER_COLOR,
      borderBottomStyle: borderStyle,
      borderRightWidth: STYLE_SELECTION_BORDER_WIDTH,
      borderRightColor: STYLE_SELECTION_BORDER_COLOR,
      borderRightStyle: borderStyle
    };

    const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = sheetRef.current._getItemStyle(y1, x1);
    const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = sheetRef.current._getItemStyle(y2, x2);

    const { top: topFrozenEnd, left: leftFrozenEnd, width: widthFrozenEnd, height: heightFrozenEnd } = sheetRef.current._getItemStyle(freezeRowCount, freezeColumnCount);

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

      customSelectionStyle = {
        ...customSelectionStyle,
        borderLeftWidth: STYLE_SELECTION_BORDER_WIDTH,
        borderLeftColor: STYLE_SELECTION_BORDER_COLOR,
        borderLeftStyle: borderStyle
      }
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

      customSelectionStyle = {
        ...customSelectionStyle,
        borderTopWidth: STYLE_SELECTION_BORDER_WIDTH,
        borderTopColor: STYLE_SELECTION_BORDER_COLOR,
        borderTopStyle: borderStyle
      }
    }

    customSelectionStyle = { 
      ...customSelectionStyle,
      left,
      top,
      width: selectionAreaWidth, 
      height: selectionAreaHeight, 
      display: null
    };

    const activeCellStyle = { 
      top: topStart, 
      left: leftStart, 
      width: widthStart, 
      height: heightStart, 
      display: null 
    };

    selectionRef.current.updateSelectionAreaStyle(customSelectionStyle);

    selectionRef.current.updateActiveCellStyle(activeCellStyle, x1 > freezeColumnCount && y1 > freezeRowCount ? isEditMode : false);
  });

  return (
    <ActivityPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
      isEditMode={isEditMode}
      sheetContainerRef={sheetContainerRef}
    />
  );
};

BottomRightActivityPane = connect(mapSelectionAreaStateToProps)(BottomRightActivityPane);

export default BottomRightActivityPane;