import React from "react";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import { RichText } from "xlsx-populate";

import { extractCellRichTextStyle } from "tools/excel";

import uniqid from "uniqid";

import "./Cell.scss";

const RichTextCellContent = (richText) => {
  let Fragments = [];

  const richTextLength = richText.length;

  for(let fragmentIndex = 0; fragmentIndex < richTextLength; fragmentIndex++) {
    const fragment = richText.get(fragmentIndex);

    const fragmentStyles = extractCellRichTextStyle(fragment);

    if(fragmentStyles) {
      const fragmentText = fragment.value();

      Fragments.push(
        <span key={uniqid()} style={fragmentStyles}>
          {fragmentText}
        </span>
      );
    }
  }

  return Fragments;
};

// ! Selection algorithms is a bit too complicated and time consuming to implement. Leave for now.

const RowHeaderCell = ({ style, value, row, handleClickRowHeader }) => {
  const handleClick = ({ ctrlKey }) => handleClickRowHeader(row, ctrlKey);

  return (
    <div className="cell cell--positionIndicator" style={style} onClick={handleClick}>
      {value}
    </div>
  );
};

const ColumnHeaderCell = ({ style, value, column, handleClickColumnHeader }) => {
  const handleClick = ({ ctrlKey }) => handleClickColumnHeader(column, ctrlKey);

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
  cellData, 

  columnIndex, 
  rowIndex, 

  handleSelectionStart,
  handleSelectionOver,

  handleDoubleClickEditableCell
}) => {
  const handleMouseDown = ({ buttons, ctrlKey, shiftKey }) => {
    if(buttons === 1) handleSelectionStart(columnIndex, rowIndex, ctrlKey, shiftKey);
  };

  const handleMouseEnter = ({ buttons, ctrlKey }) => {
    if(buttons === 1) handleSelectionOver(columnIndex, rowIndex, ctrlKey);
  };

  const handleDoubleClick = () => {
    handleDoubleClickEditableCell();
  };

  let value = cellData ? cellData.value : undefined;

  if(value instanceof RichText) value = RichTextCellContent(value);

  if(cellData && cellData.styles) {
    style = { ...style, ...cellData.styles };
  }

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
  let value;

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