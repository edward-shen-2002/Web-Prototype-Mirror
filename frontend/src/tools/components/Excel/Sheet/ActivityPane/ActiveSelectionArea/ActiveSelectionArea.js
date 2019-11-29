import React from "react";

import { connect } from "react-redux";

import "./ActiveSelectionArea.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      isSelectionMode,
      activeSelectionArea,

      sheetsFreezeColumnCount,
      sheetsFreezeRowCount,
      sheetsCellOffsets
    }
  }
}) => ({
  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],
  sheetCellOffsets: sheetsCellOffsets[activeSheetName]
});

let ActiveSelectionArea = ({ 
  computeSelectionAreaStyle,
  isRelevantArea,

  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetCellOffsets
}) => {
  if(!isSelectionMode || !activeSelectionArea) return null;

  const { x1, y1, x2, y2 } = activeSelectionArea;

  if(!isRelevantArea(x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount)) return null;

  const activeSelectionAreaStyle = computeSelectionAreaStyle(
    sheetCellOffsets, 
    activeSelectionArea, 
    sheetFreezeColumnCount, 
    sheetFreezeRowCount, 
    true
  );

  return (
    <div 
      className="activeSelectionArea" 
      style={activeSelectionAreaStyle}
    />
  );
};

ActiveSelectionArea = connect(mapStateToProps)(ActiveSelectionArea);

export default ActiveSelectionArea;