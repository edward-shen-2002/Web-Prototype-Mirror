import React from "react";

import EditableCell from "./EditableCell";
import RowHeaderCell from "./RowHeaderCell";
import ColumnHeaderCell from "./ColumnHeaderCell";
import RootHeaderCell from "./RootHeaderCell";

import "./Cell.scss";

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const {
    eventListenerRef,
    sheetCellData,

    columnCount,
    rowCount,

    handleSelectionStart,
    handleSelectionOver,

    handleDoubleClickEditableCell,

    handleRowDragStart,
    handleColumnDragStart,

    handleClickColumnHeader,
    handleClickRowHeader,
    handleClickRootHeader,
    handleContextMenu
  } = data;
  
  let cellData;
  let Component;

  if(columnIndex && rowIndex) {
    cellData = sheetCellData[rowIndex] && sheetCellData[rowIndex][columnIndex] ? sheetCellData[rowIndex][columnIndex] : undefined;

    Component = (
      <EditableCell 
        style={style} 
        cellData={cellData} 
        columnIndex={columnIndex} 
        rowIndex={rowIndex} 

        handleContextMenu={handleContextMenu}
        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}
        handleDoubleClickEditableCell={handleDoubleClickEditableCell}
      />
    );
  } else if(columnIndex) {
    Component = (
      <ColumnHeaderCell 
        style={style} 
        column={columnIndex}
        rowCount={rowCount}
        handleContextMenu={handleContextMenu}
        handleColumnDragStart={handleColumnDragStart}
        handleClickColumnHeader={handleClickColumnHeader}
      />
    );
  } else if(rowIndex) {
    Component = (
      <RowHeaderCell 
        style={style} 
        row={rowIndex}
        columnCount={columnCount}
        handleContextMenu={handleContextMenu}
        handleRowDragStart={handleRowDragStart}
        handleClickRowHeader={handleClickRowHeader}
      />
    );
  } else {
    Component = (
      <RootHeaderCell 
        style={style} 
        columnCount={columnCount}
        rowCount={rowCount}
        handleContextMenu={handleContextMenu}
        handleClickRootHeader={handleClickRootHeader}
      />
    );
  }

  return Component;
};

export default Cell;