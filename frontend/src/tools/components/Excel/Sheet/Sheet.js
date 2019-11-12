import React, { useState, useEffect, useRef } from "react";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import Cell from "./Cell";
import { TopLeftSelectionPane } from "./SelectionPane";

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

const initializeActiveCell = (sheet) => {
  const activeCell = { row: 1, column: 1 };

  const { row, column } = activeCell;
  sheet.activeCell(row, column);

  return activeCell;
};

const Sheet = ({ sheet, values, handleChangeCellValue }) => {
  const [ columnCount, setColumnCount ] = useState(DEFAULT_EXCEL_COLUMNS + 1);
  const [ rowCount, setRowCount ] = useState(DEFAULT_EXCEL_ROWS + 1);

  const [ activeCell, setActiveCell ] = useState(initializeActiveCell(sheet));

  const [ isActiveCellEditMode, setIsActiveCellEditMode ] = useState(false);

  const [ isMounted, setIsMounted ] = useState(false);

  const [ isSelectionMode, setIsSelectionMode ] = useState(false);
  const [ selectionArea, setSelectionArea ] = useState({ x1: 1, y1: 1, x2: 1, y2: 1 });

  const sheetRef = useRef(null);

  const topLeftSelectionPaneRef = useRef(null);

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
      sheet.activeCell(row, column);
      setIsActiveCellEditMode(false);
      setActiveCell({ row, column });
    } 
  };

  const handleSetActiveCellEdit = () => setIsActiveCellEditMode(true);
  const handleSetActiveCellNormal = () => setIsActiveCellEditMode(false);

  // ! Consider header/column
  const handleSelectionStart = (row, column) => {
    setIsSelectionMode(true);
    setSelectionArea({ x1: row, y1: column, x2: row, y2: column });
  };

  // ! Consider header/column
  const handleSelectionOver = (row, column) => {
    const { x1: oldX1, y1: oldY1, x2: oldX2, y2: oldY2 } = selectionArea;
    
    const x1 = Math.min(row, oldX1);
    const y1 = Math.min(column, oldY1);
    const x2 = Math.max(row, oldX2);
    const y2 = Math.max(column, oldY2);

    if(oldX1 !== x1 || oldY1 !== y1 || oldX2 !== x2 || oldY2 !== y2) setSelectionArea({ x1, y1, x2, y2 });
  };

  const handleSelectionEnd = () => {
    setIsSelectionMode(false);
  };

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
    isSelectionMode,

    handleSetActiveCell, 
    handleChangeCellValue, 
    handleSetActiveCellEdit, 
    handleSetActiveCellNormal,
    handleActiveCellArrowEvent,

    handleSelectionStart,
    handleSelectionOver,
    handleSelectionEnd
  };

  return (
    <div className="sheet">
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            ref={sheetRef}
            freezeRowCount={1}
            freezeColumnCount={1}
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={height}
            itemData={itemData}
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={width}
            extraTopLeftElement={
              <TopLeftSelectionPane 
                key="top-left-selection-pane" 
                sheetRef={sheetRef} 
                selectionRef={topLeftSelectionPaneRef}
                selectionArea={selectionArea}
              />
            }
          >
          {Cell}
        </VariableSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
};

export default Sheet;