import React from "react";

import { connect } from "react-redux";

import "./ActiveCell.scss";

const ActiveInputCell = ({ 
  activeCellStyle,
  activeCellInputValue,
  activeCellInputAutoFocus,
  handleChangeActiveInputValue
}) => {
  const handleChangeInputValue = ({ target: { value } }) => handleChangeActiveInputValue(value);

  return (
    <input 
      key="active-cell-input"
      className="activeCell activeCell--editMode" 
      style={activeCellStyle} 
      value={activeCellInputValue}
      onChange={handleChangeInputValue}
      autoFocus={activeCellInputAutoFocus}
    />
  );
};

const mapStateToProps = ({
  ui: {
    excel: {
      activeCellInputValue,
      activeCellInputAutoFocus,
      activeSheetName,
      activeCellPosition,

      isEditMode,

      sheetsFreezeColumnCount,
      sheetsFreezeRowCount,

      sheetsColumnWidthsData,
      sheetsRowHeightsData
    }
  }
}) => ({
  activeCellInputValue,
  activeCellInputAutoFocus,

  activeCellPosition,

  isEditMode,

  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],

  sheetColumnWidthsData: sheetsColumnWidthsData[activeSheetName],
  sheetRowHeightsData: sheetsRowHeightsData[activeSheetName]
});

let ActiveCell = ({ 
  isEditMode, 
  activeCellInputValue,
  activeCellInputAutoFocus,

  activeCellPosition,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnWidthsData: { columnWidths, leftOffsets },
  sheetRowHeightsData: { rowHeights, topOffsets },

  isActiveCellInCorrectPane,

  computeActiveCellStyle,

  handleChangeActiveInputValue
}) => {
  const { x, y } = activeCellPosition;

  if(!isActiveCellInCorrectPane(x, y, sheetFreezeColumnCount, sheetFreezeRowCount)) {
    return null;
  };

  const activeCellStyle = (
    computeActiveCellStyle 
      ? computeActiveCellStyle(x, y, columnWidths, leftOffsets, rowHeights, topOffsets, sheetFreezeColumnCount, sheetFreezeRowCount)
      : { top: topOffsets[y], left: leftOffsets[x], height: rowHeights[y], width: columnWidths[x] }
  );

  return (
    isEditMode 
      ? <ActiveInputCell 
          activeCellStyle={activeCellStyle} 
          activeCellInputValue={activeCellInputValue}
          activeCellInputAutoFocus={activeCellInputAutoFocus}
          handleChangeActiveInputValue={handleChangeActiveInputValue}
        />
      : <div key="inactive-cell-input" className="activeCell activeCell--normalMode" style={activeCellStyle}/>
  );
};

ActiveCell = connect(mapStateToProps)(ActiveCell);

export default ActiveCell;