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

      sheetsColumnWidthsData,
      sheetsRowHeightsData
    }
  }
}) => ({
  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],
  sheetColumnWidthsData: sheetsColumnWidthsData[activeSheetName],
  sheetRowHeightsData: sheetsRowHeightsData[activeSheetName]
});

let ActiveSelectionArea = ({ 
  computeSelectionAreaStyle,
  isRelevantArea,

  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnWidthsData: { columnWidths, leftOffsets },
  sheetRowHeightsData: { rowHeights, topOffsets }
}) => {
  if(!isSelectionMode || !activeSelectionArea) return null;

  const { x1, y1, x2, y2 } = activeSelectionArea;

  if(!isRelevantArea(x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount)) return null;

  const activeSelectionAreaStyle = computeSelectionAreaStyle(
    columnWidths, 
    leftOffsets, 
    rowHeights, 
    topOffsets,
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