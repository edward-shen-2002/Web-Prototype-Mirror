import React from "react";

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
  activeCellPosition,

  isEditMode,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetCellOffsets,

  handleChangeActiveInputValue
}) => {
  const { x, y } = activeCellPosition;
  
  if(x > sheetFreezeColumnCount || y <= sheetFreezeRowCount) return null;

  let { top, left, height, width } = sheetCellOffsets[y][x];

  const { top: topFreeze, height: heightFreeze } = sheetCellOffsets[sheetFreezeRowCount][sheetFreezeColumnCount];

  top = top - topFreeze - heightFreeze;

  const activeCellStyle = { top, left, width, height, display: null };
  
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