import React, { useState } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import "./Cell.scss";

// ! Selection algorithms is a bit too complicated and time consuming to implement. Leave for now.

const mapHeaderDispatchToProps = (dispatch) => ({
  handleSelectionArea: (selectionArea) => dispatch(updateSelectionArea(selectionArea))
});

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode } } }) => ({ selectionArea });

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

const DataCell = ({ 
  style, 
  value, 
  column, 
  row, 

  isActiveCell, 
  handleSetActiveCell, 
  handleSetActiveCellEdit,

  handleSelectionStart,
  handleSelectionOver
}) => {
  let className = "cell";
  
  const handleDoubleClick = () => {
    if(!isActiveCell) handleSetActiveCell({ row, column });
    handleSetActiveCellEdit();
  };

  const handleClick = () => {
    handleSetActiveCell({ row, column });
  };

  const handleMouseDown = () => {
    handleSelectionStart(column, row);
  };

  const handleMouseEnter = () => {
    handleSelectionOver(column, row);
  };

  return (
    <div 
      className={className} 
      style={style} 
      tabIndex="0"
      onClick={handleClick} 
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    >
      {value}
    </div>
  );
};

const EditCell = ({ 
  style, 
  value, 
  column, 
  row, 
  handleChangeCellValue, 
  handleSetActiveCell,
  handleSetActiveCellNormal
}) => {
  const [ inputValue, setInputValue ] = useState(value ? value : "");

  const handleInputChange = ({ target: { value } }) => setInputValue(value);

  const handleBlur = () => {
    handleSetActiveCell({ row, column });
  };

  const handleKeyDown = ({ key, target }) => {
    if(key === "Enter") {
      handleChangeCellValue(row, column, inputValue);
      handleSetActiveCellNormal();
    } else if(key === "Tab") {
      // handleSetActiveCellNormal();
    } else if(key === "Escape") {
      handleSetActiveCellNormal();
    }
  };

  return (
    <input
      className="cell cell--edit" 
      style={style} 
      type="text" 
      value={inputValue} 
      autoFocus 
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
};

const EditableCell = ({ 
  style, 
  value, 
  activeCell, 
  isActiveCellEditMode,

  columnIndex, 
  rowIndex, 

  columnCount,
  rowCount,

  handleChangeCellValue,
  handleSetActiveCellEdit, 
  handleSetActiveCell,
  handleSetActiveCellNormal,

  handleSelectionStart,
  handleSelectionOver
}) => {
  const { row, column } = activeCell;

  const isActiveCell = columnIndex === column && rowIndex === row;
  const isEditMode = isActiveCell && isActiveCellEditMode;

  return (
    isEditMode 
    ? (
      <EditCell 
        style={style} 
        value={value} 
        column={columnIndex} 
        row={rowIndex} 
        handleChangeCellValue={handleChangeCellValue} 
        handleSetActiveCell={handleSetActiveCell}
        handleSetActiveCellNormal={handleSetActiveCellNormal}
      />
    )
    : (
      <DataCell 
        style={style} 
        value={value} 
        column={columnIndex} 
        activeCell={activeCell}
        row={rowIndex} 
        columnCount={columnCount}
        rowCount={rowCount}
        isActiveCell={isActiveCell}
        handleSetActiveCell={handleSetActiveCell} 
        handleSetActiveCellEdit={handleSetActiveCellEdit}
        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}
      />
    )
  );
};

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const { 
    sheet, 
    activeCell, 
    isActiveCellEditMode,

    columnCount,
    rowCount,

    handleChangeCellValue, 
    handleSetActiveCellEdit, 
    handleSetActiveCell,
    handleSetActiveCellNormal,

    handleSelectionStart,
    handleSelectionOver
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
        activeCell={activeCell} 
        isActiveCellEditMode={isActiveCellEditMode}
        columnCount={columnCount}
        rowCount={rowCount}
        handleSetActiveCell={handleSetActiveCell}
        handleChangeCellValue={handleChangeCellValue}
        handleSetActiveCellEdit={handleSetActiveCellEdit}
        handleSetActiveCell={handleSetActiveCell}
        handleSetActiveCellNormal={handleSetActiveCellNormal}
        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}
      />
    );
  } else {
    if(columnIndex > 0 && rowIndex === 0) {
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
  }

  return Component;
};

export default Cell;