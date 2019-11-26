import React, { useEffect, useRef } from "react";

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
      sheetsFreezeRowCount
    }
  }
}) => ({
  activeSheetName,
  isSelectionMode,
  activeSelectionArea,

  sheetsFreezeColumnCount,
  sheetsFreezeRowCount
});

let ActiveSelectionAreaListener = ({ 
  activeSheetName,
  sheetGridRef,

  isSelectionMode,
  activeSelectionArea,

  sheetsFreezeColumnCount,
  sheetsFreezeRowCount
}) => {
  const activeSelectionAreaRef = useRef(null);

  useEffect(() => {
    const { current: ActiveSelectionAreaInstance } = activeSelectionAreaRef;

    if(isSelectionMode && activeSelectionArea) {
      const { x1, y1, x2, y2 } = activeSelectionArea;
      const sheetFreezeColumnCount = sheetsFreezeColumnCount[activeSheetName];
      const sheetFreezeRowCount = sheetsFreezeRowCount[activeSheetName];
      
      if((x1 > sheetFreezeColumnCount && x2 > sheetFreezeColumnCount) || (y1 <= sheetFreezeRowCount && y2 <= sheetFreezeRowCount)) return ActiveSelectionAreaInstance.resetActiveSelectionArea();

      const { current: SheetInstance } = sheetGridRef;
      
      ActiveSelectionAreaInstance.setActiveSelectionAreaStyle(computeSelectionAreaStyle(SheetInstance, activeSelectionArea, sheetFreezeColumnCount, sheetFreezeRowCount, true));
    } else {
      ActiveSelectionAreaInstance.resetActiveSelectionArea();
    }
  });

  return (
    <ActiveSelectionArea
      ref={activeSelectionAreaRef}
    />
  );
};

ActiveSelectionAreaListener = connect(mapStateToProps)(ActiveSelectionAreaListener);

export default ActiveSelectionAreaListener;