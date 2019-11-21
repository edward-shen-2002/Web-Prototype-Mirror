import React, { useEffect, useRef } from "react";

import { connect } from "react-redux";

import {
  STYLE_SELECTION_BORDER_COLOR,
  STYLE_SELECTION_BORDER_WIDTH,
  STYLE_ACTIVE_SELECTION_BORDER_STYLE
} from "constants/styles";

import ActiveSelectionArea from "../ActiveSelectionArea";

const mapStateToProps = ({
  ui: {
    excel: {
      isSelectionMode,
      activeSelectionArea,

      freezeColumnCount,
      freezeRowCount
    }
  }
}) => ({
  isSelectionMode,
  activeSelectionArea,

  freezeColumnCount,
  freezeRowCount
});

let ActiveSelectionAreaListener = ({ 
  sheetGridRef,

  isSelectionMode,
  activeSelectionArea,

  freezeColumnCount,
  freezeRowCount
}) => {
  const activeSelectionAreaRef = useRef(null);

  useEffect(() => {
    const { current: ActiveSelectionAreaInstance } = activeSelectionAreaRef;

    if(isSelectionMode) {
      const { x1, y1, x2, y2 } = activeSelectionArea;

      const { current: SheetInstance } = sheetGridRef;

      if((x1 <= freezeColumnCount && x2 <= freezeColumnCount) || (y1 <= freezeRowCount && y2 <= freezeRowCount)) return ActiveSelectionAreaInstance.resetActiveSelectionArea();

      let selectionAreaWidth;
      let selectionAreaHeight;
      let left;
      let top;
  
      let customSelectionStyle = {
        borderBottomWidth: STYLE_SELECTION_BORDER_WIDTH,
        borderBottomColor: STYLE_SELECTION_BORDER_COLOR,
        borderBottomStyle: STYLE_ACTIVE_SELECTION_BORDER_STYLE,
        borderRightWidth: STYLE_SELECTION_BORDER_WIDTH,
        borderRightColor: STYLE_SELECTION_BORDER_COLOR,
        borderRightStyle: STYLE_ACTIVE_SELECTION_BORDER_STYLE
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
  
        customSelectionStyle = {
          ...customSelectionStyle,
          borderLeftWidth: STYLE_SELECTION_BORDER_WIDTH,
          borderLeftColor: STYLE_SELECTION_BORDER_COLOR,
          borderLeftStyle: STYLE_ACTIVE_SELECTION_BORDER_STYLE
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
          borderTopStyle: STYLE_ACTIVE_SELECTION_BORDER_STYLE
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

      ActiveSelectionAreaInstance.setActiveSelectionAreaStyle(customSelectionStyle);
    } else {
      ActiveSelectionAreaInstance.resetActiveSelectionArea();
    }
  });

  return (
    <ActiveSelectionArea
      ref={activeSelectionAreaRef}
    />
  );
};

ActiveSelectionAreaListener = connect(mapStateToProps)(ActiveSelectionAreaListener);

export default ActiveSelectionAreaListener;