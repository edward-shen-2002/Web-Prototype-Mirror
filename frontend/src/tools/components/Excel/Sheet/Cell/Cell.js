import React, { useState } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";
import { setIsSelectionModeOn, setIsSelectionModeOff } from "actions/ui/excel/isSelectionMode";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import { arrowKeyRegex } from "tools/regex";

import "./Cell.scss";

const mapDispatchToProps = (dispatch) => ({
  handleSelectionAreaAll: (selectionArea) => dispatch(updateSelectionArea(selectionArea))
});

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea } } }) => ({ selectionArea });

let RowHeaderCell = ({ style, value, row, selectionArea }) => {
  const { y1, y2 } = selectionArea;

  const isActiveHeader = (y1 >= row && row >= y2) || (y2 >= row && row >= y1);
  const className = `cell cell--positionIndicator ${isActiveHeader ? "cell--positionIndicator-active" : "cell--positionIndicator-inactive"}`;

  return (
    <div className={className} style={style}>
      {value}
    </div>
  );
};

RowHeaderCell = connect(mapSelectionAreaStateToProps)(RowHeaderCell);

let ColumnHeaderCell = ({ style, value, column, selectionArea }) => {
  const { x1, x2 } = selectionArea;

  const isActiveHeader = (x1 >= column && column >= x2) || (x2 >= column && column >= x1);

  const className = `cell cell--positionIndicator ${isActiveHeader ? "cell--positionIndicator-active" : "cell--positionIndicator-inactive"}`;

  return (
    <div className={className} style={style}>
      {value}
    </div>
  );
};

ColumnHeaderCell = connect(mapSelectionAreaStateToProps)(ColumnHeaderCell);

let RootHeaderCell = ({ style, value, columnCount, rowCount, handleSelectionAreaAll }) => {
  const handleClick = () => handleSelectionAreaAll({ x1: 1, y1: 1, x2: columnCount - 1, y2: rowCount - 1 });

  const className = "cell cell--positionIndicator";

  return (
    <div className={className} style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

RootHeaderCell = connect(null, mapDispatchToProps)(RootHeaderCell);

const DataCell = ({ 
  style, 
  value, 
  column, 
  row, 

  columnCount,
  rowCount,

  activeCell,
  isActiveCell, 
  handleSetActiveCell, 
  handleSetActiveCellEdit,

  handleSelectionStart,
  handleSelectionOver,
  handleSelectionEnd
}) => {
  let className = "cell";

  // if(isActiveCell) className += " cell--active";
  
  const handleDoubleClick = () => {
    if(!isActiveCell) handleSetActiveCell({ row, column });
    handleSetActiveCellEdit();
  };

  const handleClick = () => {
    handleSetActiveCell({ row, column });
  };

  const handleKeyDown = ({ key }) => {
    if(arrowKeyRegex.test(key)) {
      event.preventDefault();

      let { row, column } = activeCell;
      if(key === "ArrowUp") {
        if(row > 1) row--;
      } else if(key === "ArrowDown") {
        if(row < rowCount) row++;
      } else if(key === "ArrowLeft") {
        if(column > 1) column--;
      } else {
        if(column < columnCount) column++;
      }
      
      // TODO : Consider edges in the future.. Right now do not consider edges
      if(row !== activeCell.row || column !== activeCell.column) {
        handleSetActiveCell({ row, column })
      }
    }
  };

  const handleMouseDown = () => {
    handleSelectionStart(column, row);
  };

  const handleMouseEnter = () => {
    handleSelectionOver(column, row);
  };

  const handleMouseUp = () => {
    handleSelectionEnd();
  };

  return (
    <div 
      className={className} 
      style={style} 
      tabIndex="0"
      onClick={handleClick} 
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
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
  handleActiveCellArrowEvent,

  handleSelectionStart,
  handleSelectionOver,
  handleSelectionEnd
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
        handleActiveCellArrowEvent={handleActiveCellArrowEvent}
        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}
        handleSelectionEnd={handleSelectionEnd}
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
    handleActiveCellArrowEvent,

    handleSelectionStart,
    handleSelectionOver,
    handleSelectionEnd
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
        handleActiveCellArrowEvent={handleActiveCellArrowEvent}
        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}
        handleSelectionEnd={handleSelectionEnd}
      />
    );
  } else {
    const { column, row } = activeCell;
    const isActiveHeader = columnIndex === column || rowIndex === row;

    if(columnIndex > 0 && rowIndex === 0) {
      value = columnNumberToName(columnIndex);

      Component = (
        <ColumnHeaderCell 
          style={style} 
          value={value}
          column={columnIndex}
        />
      );
    } else if(columnIndex === 0 && rowIndex > 0) {
      value = rowIndex;

      Component = (
        <RowHeaderCell 
          style={style} 
          value={value}
          row={rowIndex}
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