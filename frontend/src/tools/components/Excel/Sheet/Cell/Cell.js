import React from "react";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import "./Cell.scss";

// ! Selection algorithms is a bit too complicated and time consuming to implement. Leave for now.

const RowHeaderCell = ({ style, value, row, handleClickRowHeader }) => {
  const handleClick = () => handleClickRowHeader(row);

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

const ColumnHeaderCell = ({ style, value, column, handleClickColumnHeader }) => {
  const handleClick = () => handleClickColumnHeader(column);

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

const RootHeaderCell = ({ style, value, handleClickRootHeader }) => {
  const handleClick = () => handleClickRootHeader();

  const className = "cell cell--positionIndicator";

  return (
    <div className={className} style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

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
    sheetCellValues,

    columnCount,
    rowCount,

    handleSelectionStart,
    handleSelectionOver,

    handleDoubleClickEditableCell,

    handleClickColumnHeader,
    handleClickRowHeader,
    handleClickRootHeader
  } = data;
  
  let value;
  let Component;

  if(columnIndex > 0 && rowIndex > 0){
    value = sheetCellValues[rowIndex][columnIndex];

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
        handleClickColumnHeader={handleClickColumnHeader}
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
        handleClickRowHeader={handleClickRowHeader}
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
        handleClickRootHeader={handleClickRootHeader}
      />
    );
  }

  return Component;
};

export default Cell;