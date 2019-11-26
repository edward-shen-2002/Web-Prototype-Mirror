import React, { useRef, useEffect } from "react";

import { connect } from "react-redux";

import ActiveCell from "../ActiveCell/ActiveCell";

const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      activeCellPosition,

      isEditMode,

      sheetsFreezeColumnCount,
      sheetsFreezeRowCount
    }
  }
}) => ({
  activeSheetName,
  activeCellPosition,

  isEditMode,
  
  sheetsFreezeColumnCount,
  sheetsFreezeRowCount
});

let ActiveCellListener = ({
  activeSheetName,
  activeCellPosition,

  isEditMode,

  sheetsFreezeColumnCount,
  sheetsFreezeRowCount,

  sheetGridRef,

  handleChangeValue
}) => {
  const activeCellRef = useRef(null);
  const { x, y } = activeCellPosition;

  useEffect(() => {
    const { current: ActiveCellInstance } = activeCellRef;
    const { current: SheetInstance } = sheetGridRef;
    const sheetFreezeColumnCount = sheetsFreezeColumnCount[activeSheetName];
    const sheetFreezeRowCount = sheetsFreezeRowCount[activeSheetName];
    
    if(x <= sheetFreezeColumnCount || y > sheetFreezeRowCount) return ActiveCellInstance.resetActiveCell();

    const { top, left, height, width } = SheetInstance._getItemStyle(y, x);

    ActiveCellInstance.setActiveCell({ 
      activeCellStyle: { top, left, width, height, display: null }, 
      isNormalMode: !isEditMode 
    });
  });

  return (
    <ActiveCell 
      ref={activeCellRef}
      x={x}
      y={y}
      handleChangeValue={handleChangeValue}
    />
  );
};

ActiveCellListener = connect(mapStateToProps)(ActiveCellListener);

export default ActiveCellListener;