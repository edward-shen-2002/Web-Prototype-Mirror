import React from "react";

import { connect } from "react-redux";

import { computeSelectionAreaStyle } from "./tools";

import ActiveSelectionArea from "../ActiveSelectionArea";

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

let ActiveSelectionAreaListener = ({ 
  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetCellOffsets
}) => {
  if(!isSelectionMode || !activeSelectionArea) return null;

  const { x1, y1, x2, y2 } = activeSelectionArea;
  
  if((x1 > sheetFreezeColumnCount && x2 > sheetFreezeColumnCount) || (y1 > sheetFreezeRowCount && y2 > sheetFreezeRowCount)) return null;

  const activeSelectionAreaStyle = computeSelectionAreaStyle(sheetCellOffsets, activeSelectionArea, sheetFreezeColumnCount, sheetFreezeRowCount, true);

  return (
    <ActiveSelectionArea activeSelectionAreaStyle={activeSelectionAreaStyle}/>
  );
};
  
ActiveSelectionAreaListener = connect(mapStateToProps)(ActiveSelectionAreaListener);

export default ActiveSelectionAreaListener;