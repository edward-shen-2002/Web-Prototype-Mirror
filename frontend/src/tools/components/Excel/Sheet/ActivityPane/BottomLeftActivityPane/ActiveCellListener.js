import React, { useEffect } from "react";

import { connect } from "react-redux";

import ActiveCell from "../ActiveCell/ActiveCell";

const mapStateToProps = ({
  ui: {
    excel: {
      activeSheetName,
      activeCellPosition,

      isEditMode,

      sheetsFreezeColumnCount,
      sheetsFreezeRowCount,
      sheetsCellOffsets
    }
  }
}) => ({
  activeSheetName,
  activeCellPosition,

  isEditMode,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],
  sheetCellOffsets: sheetsCellOffsets[activeSheetName]
});

let ActiveCellListener = ({
  sheetGridRef,
  activeCellPosition,

  isEditMode,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetCellOffsets,

  handleChangeActiveInputValue
}) => {
  const { x, y } = activeCellPosition;
  
  if(x > sheetFreezeColumnCount || y <= sheetFreezeRowCount) return null;

  let activeCellStyle = sheetCellOffsets[y][x];

  const { top: topFreeze, height: heightFreeze } = sheetCellOffsets[sheetFreezeRowCount][sheetFreezeColumnCount];

  activeCellStyle.top = activeCellStyle.top - topFreeze - heightFreeze;

  useEffect(() => {
    sheetGridRef.current.scrollToItem({
      columnIndex: x,
      rowIndex: y
    });
  });
  
  return (
    <ActiveCell 
      activeCellStyle={activeCellStyle}
      isNormalMode={!isEditMode }
      handleChangeActiveInputValue={handleChangeActiveInputValue}
    />
  );
};

ActiveCellListener = connect(mapStateToProps)(ActiveCellListener);

export default ActiveCellListener;