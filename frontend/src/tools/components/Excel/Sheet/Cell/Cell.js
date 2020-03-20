import React from "react";

import EditableCellContainer from "./EditableCell";
import RowHeaderCell from "./RowHeaderCell";
import ColumnHeaderCell from "./ColumnHeaderCell";
import RootHeaderCell from "./RootHeaderCell";

import "./Cell.scss";

const Cell = ({ 
  style, 
  data, 
  columnIndex, 
  rowIndex 
}) => {
  const {
    sheetGridRef,
    sheetCellData,

    columnCount,
    rowCount
  } = data;
  
  let cellData;
  let Component;

  if(columnIndex && rowIndex) {
    cellData = sheetCellData[rowIndex] && sheetCellData[rowIndex][columnIndex] ? sheetCellData[rowIndex][columnIndex] : undefined;

    Component = (
      <EditableCellContainer 
        style={style} 
        cellData={cellData} 
        columnIndex={columnIndex} 
        rowIndex={rowIndex} 
        sheetGridRef={sheetGridRef}
      />
    );
  } else if(columnIndex) {
    Component = (
      <ColumnHeaderCell 
        style={style} 
        column={columnIndex}
        rowCount={rowCount}
      />
    );
  } else if(rowIndex) {
    Component = (
      <RowHeaderCell 
        style={style} 
        row={rowIndex}
        columnCount={columnCount}
      />
    );
  } else {
    Component = (
      <RootHeaderCell 
        style={style} 
        columnCount={columnCount}
        rowCount={rowCount}
      />
    );
  }

  return Component;
};

export default Cell;