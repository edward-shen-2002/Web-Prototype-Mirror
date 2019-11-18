import React, { useEffect } from "react";

import { connect } from "react-redux";

import ActivityPane from "./ActivityPane";

import { STYLE_SELECTION_BORDER_WIDTH, STYLE_SELECTION_BORDER_COLOR } from "constants/styles";

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode, isEditMode } } }) => ({ selectionArea, isSelectionMode, isEditMode });


let BottomLeftActivityPane = ({ 
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

    if((y1 <= freezeRowCount && y2 <= freezeRowCount) || (x1 > freezeColumnCount && x2 > freezeColumnCount)) {
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
      borderLeftWidth: STYLE_SELECTION_BORDER_WIDTH,
      borderLeftColor: STYLE_SELECTION_BORDER_COLOR,
      borderLeftStyle: borderStyle,
      borderBottomWidth: STYLE_SELECTION_BORDER_WIDTH,
      borderBottomColor: STYLE_SELECTION_BORDER_COLOR,
      borderBottomStyle: borderStyle
    };

    const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = sheetRef.current._getItemStyle(y1, x1);
    const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = sheetRef.current._getItemStyle(y2, x2);

    const { top: topFrozenEnd, left: leftFrozenEnd, width: widthFrozenEnd, height: heightFrozenEnd } = sheetRef.current._getItemStyle(freezeRowCount, freezeColumnCount);

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

      customSelectionStyle = {
        ...customSelectionStyle,
        borderRightWidth: STYLE_SELECTION_BORDER_WIDTH,
        borderRightColor: STYLE_SELECTION_BORDER_COLOR,
        borderRightStyle: borderStyle
      }
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

      customSelectionStyle = {
        ...customSelectionStyle,
        borderTopWidth: STYLE_SELECTION_BORDER_WIDTH,
        borderTopColor: STYLE_SELECTION_BORDER_COLOR,
        borderTopStyle: borderStyle
      }
    }

    customSelectionStyle = { 
      ...customSelectionStyle,
      left: left, 
      top: top, 
      width: selectionAreaWidth, 
      height: selectionAreaHeight, 
      display: null,
      zIndex: 100
    };

    const activeCellStyle = { 
      top: topStart - topFrozenEnd - heightFrozenEnd, 
      left: leftStart, 
      width: widthStart, 
      height: heightStart, 
      display: null 
    };

    selectionRef.current.updateSelectionAreaStyle(customSelectionStyle);

    if(x1 <= freezeColumnCount && y1 > freezeRowCount) {
      selectionRef.current.updateActiveCellStyle(activeCellStyle, isEditMode);
    } else {
      selectionRef.current.resetActiveCell();;
    }
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

BottomLeftActivityPane = connect(mapSelectionAreaStateToProps)(BottomLeftActivityPane);

export default BottomLeftActivityPane;