import React, { useState, useEffect, useRef } from "react";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import Cell from "./Cell";

import { 
  DEFAULT_EXCEL_ROWS, 
  DEFAULT_EXCEL_COLUMNS,

  DEFAULT_EXCEL_ROW_HEIGHT,
  DEFAULT_EXCEL_COLUMN_WIDTH,

  DEFAULT_EXCEL_ROW_HEIGHT_HIDDEN,
  DEFAULT_EXCEL_COLUMN_WIDTH_HIDDEN,
  
  DEFAULT_EXCEL_ROW_HEIGHT_HEADER,
  DEFAULT_EXCEL_COLUMN_WIDTH_HEADER
} from "constants/excel";

import "./Sheet.scss";

const handleActiveCellArrowEvent = (direction, activeCell, isActiveCellEditMode, handleSetActiveCell) => {
  if(!isActiveCellEditMode) {
    let { row, column } = activeCell;
    if(direction === "ArrowUp") {
      if(row > 1) row--;
    } else if(direction === "ArrowDown") {
      if(column < columnCount) column++;
    } else if(direction === "ArrowLeft") {
      if(column > 1) column--;
    } else {
      if(row < rowCount) row++;
    }

    if(row !== activeCell.row || column !== activeCell.column) handleSetActiveCell({ row, column });
  }
};

const Sheet = ({ sheet, values, handleChangeCellValue }) => {
  const [ columnCount, setColumnCount ] = useState(DEFAULT_EXCEL_COLUMNS + 1);
  const [ rowCount, setRowCount ] = useState(DEFAULT_EXCEL_ROWS + 1);

  const [ activeCell, setActiveCell ] = useState({ row: 1, column: 1 });

  const [ isActiveCellEditMode, setIsActiveCellEditMode ] = useState(false);

  const [ isMounted, setIsMounted ] = useState(false);

  const sheetRef = useRef(null);

  const rowHeight = (index) => {
    let height;
    
    if(index === 0) {
      height = DEFAULT_EXCEL_ROW_HEIGHT_HEADER;
    } else {
      const sheetRow = sheet.row(index);

      if(sheetRow.hidden()) {
        height = DEFAULT_EXCEL_ROW_HEIGHT_HIDDEN;
      } else {
        height = sheetRow.height();

        if(!height) height = DEFAULT_EXCEL_ROW_HEIGHT;
      }
    }

    return height;
  };

  const columnWidth = (index) => {
    let width;

    if(index === 0) {
      width = DEFAULT_EXCEL_COLUMN_WIDTH_HEADER;
    } else {
      const sheetColumn = sheet.column(index);

      if(sheetColumn.hidden()) {
        width = DEFAULT_EXCEL_COLUMN_WIDTH_HIDDEN
      } else {
        width = sheetColumn.width();

        if(!width) width = DEFAULT_EXCEL_COLUMN_WIDTH;
      }
    }

    return width;
  };

  const handleSetActiveCell = ({ row, column }) => {
    if(activeCell.row !== row || activeCell.column !== column) {
      setIsActiveCellEditMode(false);
      setActiveCell({ row, column });
    } 
  };

  const handleSetActiveCellEdit = () => setIsActiveCellEditMode(true);
  const handleSetActiveCellNormal = () => setIsActiveCellEditMode(false);

  useEffect(() => {
    if(!isMounted) {
      const { _maxColumnNumber, _maxRowNumber } = sheet.usedRange();
      setColumnCount(_maxColumnNumber + 1);
      setRowCount(_maxRowNumber + 1);
      setIsMounted(true);
    }
  });

  const itemData = { 
    sheet, 
    values, 
    activeCell, 
    isActiveCellEditMode, 

    columnCount,
    rowCount,

    handleSetActiveCell, 
    handleChangeCellValue, 
    handleSetActiveCellEdit, 
    handleSetActiveCellNormal,
    handleActiveCellArrowEvent
  };

  return (
    <div className="sheet">
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            innerRef={sheetRef}
            freezeRowCount={1}
            freezeColumnCount={1}
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={height}
            itemData={itemData}
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={width}
          >
          {Cell}
        </VariableSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
};

export default Sheet;