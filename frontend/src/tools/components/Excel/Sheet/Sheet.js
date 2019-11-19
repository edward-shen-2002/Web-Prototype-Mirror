import React, { useRef, useEffect } from "react";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import Cell from "./Cell";
import EventListener from "./EventListener";

import BottomRightActivityPane from "./ActivityPane/BottomRightActivityPane";
import TopRightActivityPane from "./ActivityPane/TopRightActivityPane";
import BottomLeftActivityPane from "./ActivityPane/BottomLeftActivityPane";
import TopLeftActivityPane from "./ActivityPane/TopLeftActivityPane";

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

  sheetRef
}) => {
  const topRightSelectionPaneRef = useRef(null);
  const topLeftSelectionPaneRef = useRef(null);
  const bottomLeftSelectionPaneRef = useRef(null);
  const bottomRightSelectionPaneRef = useRef(null);

  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);

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

  // ! Consider header/column
  const handleSelectionStart = (x1, y1) => {
    eventListenerRef.current.startSelectionArea({ x1, y1, x2: x1, y2: y1 });
  };

  // ! Consider header/column
  const handleSelectionOver = (x2, y2) => {
    eventListenerRef.current.updateSelectionArea({ x2, y2 });
  };

  const handleDoubleClickEditableCell = () => {
    eventListenerRef.current.setEditModeOn();
  };

  const handleClickColumnHeader = (column) => {
    eventListenerRef.current.selectColumnHeader(column);
  };

  const handleClickRowHeader = (row) => {
    eventListenerRef.current.selectRowHeader(row);
  };

  const handleClickRootHeader = () => {
    eventListenerRef.current.selectRootHeader();
  };

  const itemData = { 
    sheet, 
    values, 
    
    columnCount,
    rowCount,

    handleDoubleClickEditableCell,

    handleSelectionStart,
    handleSelectionOver,

    handleClickColumnHeader,
    handleClickRowHeader,
    handleClickRootHeader
  };

  const handleKeyDown = (event) => {
    const { key, shiftKey, ctrlKey } = event;
    
    if(key === "ArrowUp") {
      eventListenerRef.current.moveUp(event);
    } else if(key === "ArrowDown") {
      eventListenerRef.current.moveDown(event);
    } else if(key === "ArrowLeft") {
      eventListenerRef.current.moveLeft(event);
    } else if(key === "ArrowRight") {
      eventListenerRef.current.moveRight(event);
    } else if(key === "Enter") {
      eventListenerRef.current.enter(sheetContainerRef, event);
    } else if(key === "Tab" && shiftKey) {
      eventListenerRef.current.shiftTab(sheetContainerRef, event);
    } else if(key === "Tab") {
      eventListenerRef.current.tab(sheetContainerRef, event);
    } else if(key === "Escape") {
      eventListenerRef.current.esc(sheetContainerRef);
    } else if(key === "a" && ctrlKey) {
      eventListenerRef.current.ctrlA(event);
    }
  };
  
  freezeRowCount = freezeRowCount + 0;
  freezeColumnCount = freezeColumnCount + 2;

  const tableFreezeRowCount = freezeRowCount + 1;
  const tableFreezeColumnCount = freezeColumnCount + 1;

  const commonSelectionPaneProps = { sheetRef, sheetContainerRef, freezeRowCount, freezeColumnCount };

  return (
    <div 
      ref={sheetContainerRef}
      className="sheet"
      tabIndex="0"
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
            extraTopLeftElement={
              <TopLeftActivityPane key="top-left-selection-pane" selectionRef={topLeftSelectionPaneRef} {...commonSelectionPaneProps}/>
            }
            extraTopRightElement={
              <TopRightActivityPane key="top-right-activity-pane" selectionRef={topRightSelectionPaneRef} {...commonSelectionPaneProps}/>  
            }
            extraBottomLeftElement={
              <BottomLeftActivityPane key="bottom-left-activity-pane" selectionRef={bottomLeftSelectionPaneRef} {...commonSelectionPaneProps}/>
            }
            extraBottomRightElement={
              <BottomRightActivityPane key="bottom-right-activity-pane" selectionRef={bottomRightSelectionPaneRef} {...commonSelectionPaneProps}/>
            }
          >
            {Cell}
          </VariableSizeGrid>
        )}
      </AutoSizer>
      <EventListener 
        eventListenerRef={eventListenerRef} 
        columnCount={columnCount} 
        rowCount={rowCount}
        sheet={sheet}
        sheetContainerRef={sheetContainerRef}
      />
    </div>
  );
};

export default Sheet;