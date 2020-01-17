import React, { useMemo } from "react";

import { connect } from "react-redux";

import { getTopOffsets, getLeftOffsets } from "@tools/excel";

import "./ActiveSelectionArea.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      isSelectionMode,
      activeSelectionArea,

      sheetFreezeColumnCount,
      sheetFreezeRowCount,
      sheetColumnWidths,
      sheetRowHeights,
      sheetColumnCount,
      sheetRowCount
    }
  }
}) => ({
  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,
  sheetColumnWidths,
  sheetRowHeights,
  sheetColumnCount,
  sheetRowCount
});

let ActiveSelectionArea = ({ 
  computeSelectionAreaStyle,
  isRelevantArea,

  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnWidths,
  sheetRowHeights,

  sheetColumnCount,
  sheetRowCount
}) => {
  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);
  
  if(!isSelectionMode || !activeSelectionArea) return null;

  const { x1, y1, x2, y2 } = activeSelectionArea;

  if(!isRelevantArea(x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount)) return null;

  const activeSelectionAreaStyle = computeSelectionAreaStyle(
    sheetColumnWidths, 
    leftOffsets, 
    sheetRowHeights, 
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