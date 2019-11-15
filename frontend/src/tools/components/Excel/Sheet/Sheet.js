import React, { useRef } from "react";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import { arrowKeyRegex } from "tools/regex";

import Cell from "./Cell";
import EventListener from "./EventListener";

import { BottomRightSelectionPane, TopRightSelectionPane, TopLeftSelectionPane, BottomLeftSelectionPane } from "./SelectionPane";

import { 
  DEFAULT_EXCEL_ROW_HEIGHT,
  DEFAULT_EXCEL_COLUMN_WIDTH,

  DEFAULT_EXCEL_ROW_HEIGHT_HIDDEN,
  DEFAULT_EXCEL_COLUMN_WIDTH_HIDDEN,
  
  DEFAULT_EXCEL_ROW_HEIGHT_HEADER,
  DEFAULT_EXCEL_COLUMN_WIDTH_HEADER
} from "constants/excel";

import "./Sheet.scss";

const Sheet = ({ 
  sheet, 
  values, 
  columnCount,
  rowCount,

  freezeRowCount,
  freezeColumnCount,

  sheetRef,

  activeCell,

  isActiveCellEditMode,
  handleSetActiveCellNormal,
  handleSetActiveCellEdit,

  handleChangeCellValue, 
  handleUpdateSelectionArea, 
  handleSetSelectionModeOn
}) => {
  const topRightSelectionPaneRef = useRef(null);
  const topLeftSelectionPaneRef = useRef(null);
  const bottomLeftSelectionPaneRef = useRef(null);
  const bottomRightSelectionPaneRef = useRef(null);

  const eventListenerRef = useRef(null);

  const rowHeight = (index) => {
    let height;
    
    if(index === 0) {
      height = DEFAULT_EXCEL_ROW_HEIGHT_HEADER;
    } else if(index === 1) {
      height = 100;
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
    sheet.activeCell(row, column);
    handleUpdateSelectionArea({ x1: column , y1: row, x2: column, y2: row });
  };

  // ! Consider header/column
  const handleSelectionStart = (x1, y1) => {
    handleSetSelectionModeOn();
    handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  };

  // ! Consider header/column
  const handleSelectionOver = (x2, y2) => {
    handleUpdateSelectionArea({ x2, y2 });
  };

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

    handleSelectionStart,
    handleSelectionOver
  };

  const handleKeyDown = ({ key }) => {
    if(arrowKeyRegex.test(key)) {
      event.preventDefault();

      if(key === "ArrowUp") {
        eventListenerRef.current.moveUp();
      } else if(key === "ArrowDown") {
        eventListenerRef.current.moveDown();
      } else if(key === "ArrowLeft") {
        eventListenerRef.current.moveLeft();
      } else {
        eventListenerRef.current.moveRight();
      }
    }
  };

  const tableFreezeRowCount = freezeRowCount + 3;
  const tableFreezeColumnCount = freezeColumnCount + 3;

  freezeRowCount = freezeRowCount + 2;

  freezeColumnCount = freezeColumnCount + 2;

  const commonSelectionPaneProps = { sheetRef, freezeRowCount, freezeColumnCount };

  return (
    <div className="sheet"
      onKeyDown={handleKeyDown}
    >
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            ref={sheetRef}
            freezeRowCount={tableFreezeRowCount}
            freezeColumnCount={tableFreezeColumnCount}
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={height}
            itemData={itemData}
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={width}
            extraTopLeftElement={(
              <TopLeftSelectionPane
                key="top-left-selection-pane"
                selectionRef={topLeftSelectionPaneRef}
                {...commonSelectionPaneProps}
              />
            )}
            extraTopRightElement={(
              <TopRightSelectionPane
                key="top-right-selection-pane"
                selectionRef={topRightSelectionPaneRef}
                {...commonSelectionPaneProps}
              />  
            )}
            extraBottomLeftElement={(
              <BottomLeftSelectionPane 
                key="bottom-left-selection-pane" 
                selectionRef={bottomLeftSelectionPaneRef} 
                {...commonSelectionPaneProps}
              />
            )}
            extraBottomRightElement={(
              <BottomRightSelectionPane 
                key="bottom-right-selection-pane" 
                selectionRef={bottomRightSelectionPaneRef} 
                {...commonSelectionPaneProps}
              />
            )}
          >
            {Cell}
          </VariableSizeGrid>
        )}
      </AutoSizer>
      <EventListener eventListenerRef={eventListenerRef} columnCount={columnCount} rowCount={rowCount}/>
    </div>
  );
};

export default Sheet;