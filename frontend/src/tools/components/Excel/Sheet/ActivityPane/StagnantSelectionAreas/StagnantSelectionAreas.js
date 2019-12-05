import React, { useMemo } from "react";

import { connect } from "react-redux";

import { getTopOffsets, getLeftOffsets } from "tools/excel";

import "./StagnantSelectionAreas.scss";

const StagnantSelectionAreasComponents = ({ relevantStagnantSelectionAreasStyles }) => relevantStagnantSelectionAreasStyles.map((style, index) => (
  <div key={index} className="stagnantSelectionArea" style={style}/>
));

const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      stagnantSelectionAreas,

      sheetsFreezeRowCount,
      sheetsFreezeColumnCount,
      sheetsColumnWidths,
      sheetsRowHeights,

      sheetsRowCount,
      sheetsColumnCount
    }
  }
}) => ({
  stagnantSelectionAreas,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],
  sheetColumnWidths: sheetsColumnWidths[activeSheetName],
  sheetRowHeights: sheetsRowHeights[activeSheetName],
  sheetColumnCount: sheetsColumnCount[activeSheetName],
  sheetRowCount: sheetsRowCount[activeSheetName]
});

let StagnantSelectionAreas = ({
  stagnantSelectionAreas,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnWidths,
  sheetRowHeights,

  sheetColumnCount,
  sheetRowCount,

  isRelevantArea,
  computeSelectionAreaStyle
}) => {
  const relevantStagnantSelectionAreas = stagnantSelectionAreas.filter(({ x1, y1, x2, y2 }) => isRelevantArea(x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount));

  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

  const relevantStagnantSelectionAreasStyles = relevantStagnantSelectionAreas.map((stagnantSelectionArea) => computeSelectionAreaStyle(sheetColumnWidths, leftOffsets, sheetRowHeights, topOffsets, stagnantSelectionArea, sheetFreezeColumnCount, sheetFreezeRowCount, false));

  return (
    <StagnantSelectionAreasComponents
      relevantStagnantSelectionAreasStyles={relevantStagnantSelectionAreasStyles}
    />
  );
};

StagnantSelectionAreas = connect(mapStateToProps)(StagnantSelectionAreas);

export default StagnantSelectionAreas;