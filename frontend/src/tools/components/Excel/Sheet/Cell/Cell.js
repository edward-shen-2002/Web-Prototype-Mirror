import React from "react";

import EditableCell from "./EditableCell";
import RowHeaderCell from "./RowHeaderCell";
import ColumnHeaderCell from "./ColumnHeaderCell";
import RootHeaderCell from "./RootHeaderCell";

import "./Cell.scss";

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const {
    sheetCellData,

    columnCount,
    rowCount,

    handleSelectionStart,
    handleSelectionOver,

    handleDoubleClickEditableCell,

    handleClickColumnHeader,
    handleClickRowHeader,
    handleClickRootHeader
  } = data;
  
  let cellData;
  let Component;

  if(columnIndex > 0 && rowIndex > 0){
    cellData = sheetCellData[rowIndex] && sheetCellData[rowIndex][columnIndex] ? sheetCellData[rowIndex][columnIndex] : undefined;

    Component = (
      <EditableCell 
        style={style} 
        cellData={cellData} 

        columnIndex={columnIndex} 
        rowIndex={rowIndex} 

        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}

        handleDoubleClickEditableCell={handleDoubleClickEditableCell}
      />
    );
  } else if(columnIndex > 0 && rowIndex === 0) {
    Component = (
      <ColumnHeaderCell 
        style={style} 
        column={columnIndex}
        rowCount={rowCount}
        handleClickColumnHeader={handleClickColumnHeader}
      />
    );
  } else if(columnIndex === 0 && rowIndex > 0) {
    Component = (
      <RowHeaderCell 
        style={style} 
        row={rowIndex}
        columnCount={columnCount}
        handleClickRowHeader={handleClickRowHeader}
      />
    );
  } else {
    Component = (
      <RootHeaderCell 
        style={style} 
        columnCount={columnCount}
        rowCount={rowCount}
        handleClickRootHeader={handleClickRootHeader}
      />
    );
  }

  return Component;
};

export default Cell;