import React, { useRef, useEffect } from "react";

import { connect } from "react-redux";

import StagnantSelectionAreas from "../StagnantSelectionAreas";

import { computeSelectionAreaStyle } from "./tools";


const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      stagnantSelectionAreas,

      sheetsFreezeColumnCount,
      sheetsFreezeRowCount
    }
  }
}) => ({
  activeSheetName,
  stagnantSelectionAreas,

  sheetsFreezeColumnCount,
  sheetsFreezeRowCount
});

let StagnantSelectionAreasListener = ({
  activeSheetName,
  sheetGridRef,

  stagnantSelectionAreas,

  sheetsFreezeColumnCount,
  sheetsFreezeRowCount
}) => {
  const stagnantSelectionAreasRef = useRef(null);

  useEffect(() => {
    if(stagnantSelectionAreas) {
      const { current: SheetInstance } = sheetGridRef;
      const { current: StagnantSelectionAreasInstance } = stagnantSelectionAreasRef;
      const sheetFreezeColumnCount = sheetsFreezeColumnCount[activeSheetName];
      const sheetFreezeRowCount = sheetsFreezeRowCount[activeSheetName];

      const relevantStagnantSelectionAreas = stagnantSelectionAreas.filter(({ x1, y1, x2, y2 }) => (x1 <= sheetFreezeColumnCount || x2 <= sheetFreezeColumnCount) && (y1 <= sheetFreezeRowCount || y2 <= sheetFreezeRowCount));

      const relevantStagnantSelectionAreasStyles = relevantStagnantSelectionAreas.map((stagnantSelectionArea) => computeSelectionAreaStyle(SheetInstance, stagnantSelectionArea, sheetFreezeColumnCount, sheetFreezeRowCount, false));

      StagnantSelectionAreasInstance.setStagnantSelectionAreasStyles(relevantStagnantSelectionAreasStyles);
    }
  });

  return (
    <StagnantSelectionAreas
      ref={stagnantSelectionAreasRef}
    />
  );
};

StagnantSelectionAreasListener = connect(mapStateToProps)(StagnantSelectionAreasListener);

export default StagnantSelectionAreasListener;