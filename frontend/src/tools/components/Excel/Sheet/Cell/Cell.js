import React, { useState, useEffect } from "react";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import "./Cell.scss";

const HeaderCell = ({ style, value }) => (
  <div className="cell cell--positionIndicator" style={style}>
    {value}
  </div>
);

const DataCell = ({ style, value, column, row, handleSetActiveCell }) => {
  const handleDoubleClick = () => handleSetActiveCell({ row, column });

  return (
    <div className="cell" style={style} onDoubleClick={handleDoubleClick}>
      {value}
    </div>
  );
};

const EditCell = ({ style, value, column, row, handleResetActiveCell, handleChangeCellValue }) => {
  const [ inputValue, setInputValue ] = useState(value ? value : "");

  const handleInputChange = ({ target: { value } }) => setInputValue(value);

  const handleBlur = () => {
    handleResetActiveCell();
  };

  const handleKeyDown = ({ key, target }) => {
    if(key === "Enter") {
      handleChangeCellValue(row, column, inputValue);
      target.blur();
    } else if(key === "Tab") {
      target.blur();
    } else if(key === "Escape") {
      target.blur();
    }
  };

  return (
    <input 
      type="text" 
      style={style} 
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
  columnIndex, 
  rowIndex, 
  handleResetActiveCell, 
  handleSetActiveCell, 
  handleChangeCellValue 
}) => {
  const { row, column } = activeCell;

  const isViewMode = columnIndex !== column || rowIndex !== row;

  return (
    isViewMode 
      ? <DataCell style={style} value={value} column={columnIndex} row={rowIndex} handleSetActiveCell={handleSetActiveCell}/>
      : <EditCell style={style} value={value} column={columnIndex} row={rowIndex} handleResetActiveCell={handleResetActiveCell} handleChangeCellValue={handleChangeCellValue}/>
  );
};

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const { sheet, activeCell, handleResetActiveCell, handleSetActiveCell, handleChangeCellValue } = data;

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
        handleResetActiveCell={handleResetActiveCell} 
        handleSetActiveCell={handleSetActiveCell}
        handleChangeCellValue={handleChangeCellValue}
      />
    );
  } else {
    if(columnIndex > 0 && rowIndex === 0) {
      value = columnNumberToName(columnIndex);
    } else if(columnIndex === 0 && rowIndex > 0) {
      value = rowIndex;
    }

    Component = (
      <HeaderCell style={style} value={value}/>
    );
  }

  return Component;
};

export default Cell;