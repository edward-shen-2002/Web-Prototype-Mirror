import React, { useRef } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import "./Cell.scss";

// ! Selection algorithms is a bit too complicated and time consuming to implement. Leave for now.

const mapHeaderDispatchToProps = (dispatch) => ({
  handleSelectionArea: (selectionArea) => dispatch(updateSelectionArea(selectionArea))
});

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea } } }) => ({ selectionArea });

let RowHeaderCell = ({ style, value, row, columnCount, selectionArea, handleSelectionArea }) => {
  const { y1, y2 } = selectionArea;

  const isActiveHeader = (y1 >= row && row >= y2) || (y2 >= row && row >= y1);
  const className = `cell cell--positionIndicator ${isActiveHeader ? "cell--positionIndicator-active" : "cell--positionIndicator-inactive"}`;

  const handleClick = () => handleSelectionArea({ x1: 1, y1: row, x2: columnCount - 1, y2: row });

  return (
    <div className={className} style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

RowHeaderCell = connect(mapSelectionAreaStateToProps, mapHeaderDispatchToProps)(RowHeaderCell);

let ColumnHeaderCell = ({ style, value, column, rowCount, selectionArea, handleSelectionArea }) => {
  const { x1, x2 } = selectionArea;  
  const isActiveHeader = (x1 >= column && column >= x2) || (x2 >= column && column >= x1);
  const className = `cell cell--positionIndicator ${isActiveHeader ? "cell--positionIndicator-active" : "cell--positionIndicator-inactive"}`;
  
  const handleClick = () => handleSelectionArea({ x1: column, y1: 1, x2: column, y2: rowCount - 1 });

  return (
    <div className={className} style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

ColumnHeaderCell = connect(mapSelectionAreaStateToProps, mapHeaderDispatchToProps)(ColumnHeaderCell);

let RootHeaderCell = ({ style, value, columnCount, rowCount, handleSelectionArea }) => {
  const handleClick = () => handleSelectionArea({ x1: 1, y1: 1, x2: columnCount - 1, y2: rowCount - 1 });

  const className = "cell cell--positionIndicator";

  return (
    <div className={className} style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

RootHeaderCell = connect(null, mapHeaderDispatchToProps)(RootHeaderCell);

const EditableCell = ({ 
  style, 
  value, 

  columnIndex, 
  rowIndex, 

  handleSelectionStart,
  handleSelectionOver,

  handleDoubleClickEditableCell
}) => {
  const handleMouseDown = ({ buttons }) => {
    if(buttons === 1) handleSelectionStart(columnIndex, rowIndex);
  };

  const handleMouseEnter = ({ buttons }) => {
    if(buttons === 1) handleSelectionOver(columnIndex, rowIndex);
  };

  const handleDoubleClick = () => {
    handleDoubleClickEditableCell();
  };

  return (
    <div 
      className="cell" 
      style={style} 
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onDoubleClick={handleDoubleClick}
    >
      {value}
    </div>
  );
};

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const { 
    sheet,

    columnCount,
    rowCount,

    handleSelectionStart,
    handleSelectionOver,

    handleDoubleClickEditableCell
  } = data;
  
  let value;
  let Component;

  if(columnIndex > 0 && rowIndex > 0){
    value = sheet.row(rowIndex).cell(columnIndex).value();

    Component = (
      <EditableCell 
        style={style} 
        value={value} 

        columnIndex={columnIndex} 
        rowIndex={rowIndex} 

        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}

        handleDoubleClickEditableCell={handleDoubleClickEditableCell}
      />
    );
  } else if(columnIndex > 0 && rowIndex === 0) {
    value = columnNumberToName(columnIndex);

    Component = (
      <ColumnHeaderCell 
        style={style} 
        value={value}
        column={columnIndex}
        rowCount={rowCount}
      />
    );
  } else if(columnIndex === 0 && rowIndex > 0) {
    value = rowIndex;

    Component = (
      <RowHeaderCell 
        style={style} 
        value={value}
        row={rowIndex}
        columnCount={columnCount}
      />
    );
  } else {
    value = "";

    Component = (
      <RootHeaderCell 
        style={style} 
        value={value}
        columnCount={columnCount}
        rowCount={rowCount}
      />
    );
  }

  return Component;
};

export default Cell;