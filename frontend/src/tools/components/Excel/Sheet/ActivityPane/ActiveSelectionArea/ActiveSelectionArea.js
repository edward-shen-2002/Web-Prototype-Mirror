import React, { useMemo } from "react";

import { connect } from "react-redux";

import { getTopOffsets, getLeftOffsets } from "tools/excel";

import "./ActiveSelectionArea.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      isSelectionMode,
      activeSelectionArea,

      sheetsFreezeColumnCount,
      sheetsFreezeRowCount,

      sheetsColumnWidths,
      sheetsRowHeights,

      sheetsColumnCount,
      sheetsRowCount
    }
  }
}) => ({
  isSelectionMode,
  activeSelectionArea,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],
  sheetColumnWidths: sheetsColumnWidths[activeSheetName],
  sheetRowHeights: sheetsRowHeights[activeSheetName],
  sheetColumnCount: sheetsColumnCount[activeSheetName],
  sheetRowCount: sheetsRowCount[activeSheetName]
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
  if(!isSelectionMode || !activeSelectionArea) return null;

  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

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