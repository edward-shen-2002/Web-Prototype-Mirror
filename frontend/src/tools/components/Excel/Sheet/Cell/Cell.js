import React, { useState } from "react";

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

const EditCell = ({ style, value, handleResetActiveCell }) => {
  const [ inputValue, setInputValue ] = useState(value);

  const handleInputChange = ({ target: { value } }) => setInputValue(value);

  const handleBlur = () => {
    handleResetActiveCell();
  };

  return (
    <input 
      type="text" 
      style={style} 
      value={inputValue} 
      autoFocus 
      onChange={handleInputChange}
      // onKeyPress
      onBlur={handleBlur}
    />
  );
};

const EditableCell = ({ style, value, activeCell, columnIndex, rowIndex, handleResetActiveCell, handleSetActiveCell }) => {
  const { row, column } = activeCell;

  const isViewMode = columnIndex !== column || rowIndex !== row;

  return (
    isViewMode 
      ? <DataCell style={style} value={value} column={columnIndex} row={rowIndex} handleSetActiveCell={handleSetActiveCell}/>
      : <EditCell style={style} value={value} handleResetActiveCell={handleResetActiveCell}/>
  );
};

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const { sheet, activeCell, handleResetActiveCell, handleSetActiveCell } = data;

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