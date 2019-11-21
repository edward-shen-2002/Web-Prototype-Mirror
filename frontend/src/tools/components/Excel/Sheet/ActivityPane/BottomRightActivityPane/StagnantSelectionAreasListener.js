import React, { useRef, useEffect } from "react";

import { connect } from "react-redux";

import StagnantSelectionAreas from "../StagnantSelectionAreas";

import {
  STYLE_SELECTION_BORDER_COLOR,
  STYLE_SELECTION_BORDER_WIDTH,
  STYLE_ACTIVE_SELECTION_BORDER_STYLE
} from "constants/styles";
import { computeSelectionAreaStyle } from "./tools";


const mapStateToProps = ({
  ui: {
    excel: {
      stagnantSelectionAreas,

      freezeRowCount,
      freezeColumnCount
    }
  }
}) => ({
  stagnantSelectionAreas,

  freezeRowCount,
  freezeColumnCount
});

let StagnantSelectionAreasListener = ({
  sheetGridRef,

  stagnantSelectionAreas,

  freezeRowCount,
  freezeColumnCount
}) => {
  const stagnantSelectionAreasRef = useRef(null);

  useEffect(() => {
    if(stagnantSelectionAreas) {
      const { current: SheetInstance } = sheetGridRef;
      const { current: StagnantSelectionAreasInstance } = stagnantSelectionAreasRef;

      const relevantStagnantSelectionAreas = stagnantSelectionAreas.filter(({ x1, y1, x2, y2 }) => (x1 > freezeColumnCount || x2 > freezeColumnCount) && (y1 > freezeRowCount || y2 > freezeRowCount));

      const relevantStagnantSelectionAreasStyles = relevantStagnantSelectionAreas.map((stagnantSelectionArea) => computeSelectionAreaStyle(SheetInstance, stagnantSelectionArea, freezeColumnCount, freezeRowCount));

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