import React, { useEffect } from "react";

import { connect } from "react-redux";

import ActivityPane from "./ActivityPane";

import { STYLE_SELECTION_BORDER_WIDTH, STYLE_SELECTION_BORDER_COLOR } from "constants/styles";

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode, isEditMode } } }) => ({ selectionArea, isSelectionMode, isEditMode });


let TopRightActivityPane = ({ 
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

    let borderStyle = isSelectionMode ? "dashed" : "solid";
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

    const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = sheetRef.current._getItemStyle(y1, x1);
    const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = sheetRef.current._getItemStyle(y2, x2);

    const { top: topFrozenEnd, left: leftFrozenEnd, width: widthFrozenEnd, height: heightFrozenEnd } = sheetRef.current._getItemStyle(freezeRowCount, freezeColumnCount);
    const { height: heightHeader } = sheetRef.current._getItemStyle(0, 0);

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

      customSelectionStyle = {
        ...customSelectionStyle,
        borderLeftWidth: STYLE_SELECTION_BORDER_WIDTH,
        borderLeftColor: STYLE_SELECTION_BORDER_COLOR,
        borderLeftStyle: borderStyle
      }
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

      customSelectionStyle = {
        ...customSelectionStyle,
        borderBottomWidth: STYLE_SELECTION_BORDER_WIDTH,
        borderBottomColor: STYLE_SELECTION_BORDER_COLOR,
        borderBottomStyle: borderStyle
      }
    }

    if(x1 > freezeColumnCount || x2 > freezeColumnCount) {
      selectionRef.current.updateColumnHeaderStyle({
        left,
        top: 0,
        width: selectionAreaWidth,
        height: heightHeader,
        display: null
      });
    } else {
      selectionRef.current.resetColumnHeaderStyle();
    }

    
    if((y1 > freezeRowCount && y2 > freezeRowCount) || (x1 <= freezeColumnCount && x2 <= freezeColumnCount)) {
      selectionRef.current.resetActiveCell();
      selectionRef.current.resetSelectionArea();

      return;
    }

    customSelectionStyle = { 
      ...customSelectionStyle,
      left: left, 
      top: top, 
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

    if(x1 > freezeColumnCount && y1 <= freezeRowCount) {
      selectionRef.current.updateActiveCellStyle(activeCellStyle, isEditMode);
    } else {
      selectionRef.current.resetActiveCell();
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

TopRightActivityPane = connect(mapSelectionAreaStateToProps)(TopRightActivityPane);

export default TopRightActivityPane;