import React, { useState, useEffect } from "react";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import "./Cell.scss";

const HeaderCell = ({ style, value }) => (
  <div className="cell cell--positionIndicator" style={style}>
    {value}
  </div>
);

const DataCell = ({ style, value, column, row, isActiveCell, handleSetActiveCell, handleSetActiveCellEdit }) => {
  let className = "cell";

  if(isActiveCell) className += " cell--active";
  
  const handleDoubleClick = () => {
    if(!isActiveCell) handleSetActiveCell({ row, column });
    handleSetActiveCellEdit();
  };

  const handleClick = () => {
    handleSetActiveCell({ row, column });
  };

  return (
    <div className={className} style={style} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {value}
    </div>
  );
};

const EditCell = ({ style, value, column, row, handleChangeCellValue, handleSetActiveCellNormal }) => {
  const [ inputValue, setInputValue ] = useState(value ? value : "");

  const handleInputChange = ({ target: { value } }) => setInputValue(value);

  const handleBlur = () => {
    handleSetActiveCellNormal();
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
      className="cell--edit" 
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
  handleSetActiveCell, 
  handleChangeCellValue,
  handleSetActiveCellEdit, 
  handleSetActiveCellNormal
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
        handleSetActiveCellNormal={handleSetActiveCellNormal}
      />
    )
    : (
      <DataCell 
        style={style} 
        value={value} 
        column={columnIndex} 
        row={rowIndex} 
        isActiveCell={isActiveCell}
        handleSetActiveCell={handleSetActiveCell} 
        handleSetActiveCellEdit={handleSetActiveCellEdit}
      />
    )
  );
};

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const { 
    sheet, 
    activeCell, 
    isActiveCellEditMode,
    handleSetActiveCell, 
    handleChangeCellValue, 
    handleSetActiveCellEdit, 
    handleSetActiveCellNormal 
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
        handleSetActiveCell={handleSetActiveCell}
        handleChangeCellValue={handleChangeCellValue}
        handleSetActiveCellEdit={handleSetActiveCellEdit}
        handleSetActiveCellNormal={handleSetActiveCellNormal}
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