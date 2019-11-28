import React from "react";

import { connect } from "react-redux";

import StagnantSelectionAreas from "../StagnantSelectionAreas";

import { computeSelectionAreaStyle } from "./tools";


const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      stagnantSelectionAreas,

      sheetsFreezeRowCount,
      sheetsFreezeColumnCount,
      sheetsCellOffsets
    }
  }
}) => ({
  stagnantSelectionAreas,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],
  sheetCellOffsets: sheetsCellOffsets[activeSheetName]
});

let StagnantSelectionAreasListener = ({
  stagnantSelectionAreas,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetCellOffsets
}) => {
  const relevantStagnantSelectionAreas = stagnantSelectionAreas.filter(({ x1, y1, x2, y2 }) => (x1 > sheetFreezeColumnCount || x2 > sheetFreezeColumnCount) && (y1 > sheetFreezeRowCount || y2 > sheetFreezeRowCount));

  const relevantStagnantSelectionAreasStyles = relevantStagnantSelectionAreas.map((stagnantSelectionArea) => computeSelectionAreaStyle(sheetCellOffsets, stagnantSelectionArea, sheetFreezeColumnCount, sheetFreezeRowCount, false));

  return (
    <StagnantSelectionAreas
      relevantStagnantSelectionAreasStyles={relevantStagnantSelectionAreasStyles}
    />
  );
};

StagnantSelectionAreasListener = connect(mapStateToProps)(StagnantSelectionAreasListener);

export default StagnantSelectionAreasListener;