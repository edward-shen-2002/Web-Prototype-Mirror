import React from "react";

import { connect } from "react-redux";

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
      sheetsColumnWidthsData,
      sheetsRowHeightsData
    }
  }
}) => ({
  stagnantSelectionAreas,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],
  sheetColumnWidthsData: sheetsColumnWidthsData[activeSheetName],
  sheetRowHeightsData: sheetsRowHeightsData[activeSheetName]
});

let StagnantSelectionAreas = ({
  stagnantSelectionAreas,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnWidthsData: { columnWidths, leftOffsets },
  sheetRowHeightsData: { rowHeights, topOffsets },

  isRelevantArea,
  computeSelectionAreaStyle
}) => {
  const relevantStagnantSelectionAreas = stagnantSelectionAreas.filter(({ x1, y1, x2, y2 }) => isRelevantArea(x1, y1, x2, y2, sheetFreezeColumnCount, sheetFreezeRowCount));

  const relevantStagnantSelectionAreasStyles = relevantStagnantSelectionAreas.map((stagnantSelectionArea) => computeSelectionAreaStyle(columnWidths, leftOffsets, rowHeights, topOffsets, stagnantSelectionArea, sheetFreezeColumnCount, sheetFreezeRowCount, false));

  return (
    <StagnantSelectionAreasComponents
      relevantStagnantSelectionAreasStyles={relevantStagnantSelectionAreasStyles}
    />
  );
};

StagnantSelectionAreas = connect(mapStateToProps)(StagnantSelectionAreas);

export default StagnantSelectionAreas;