import React, { useRef } from "react";

import { connect } from "react-redux";

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

const mapStateToProps = ({
  ui: {
    excel: {
      sheetCellValues,
      columnCount,
      rowCount,
      columnWidths,
      rowHeights,
      freezeRowCount,
      freezeColumnCount
    }
  }
}) => ({
  sheetCellValues,
  columnCount,
  rowCount,
  columnWidths,
  rowHeights,
  freezeRowCount,
  freezeColumnCount
});

let SheetWindow = ({
  sheetCellValues,
  freezeRowCount,
  freezeColumnCount,
  columnCount,
  rowCount,
  columnWidths,
  rowHeights,
  sheetRef,
  eventListenerRef,
  sheetContainerRef,
}) => {
  const topRightSelectionPaneRef = useRef(null);
  const topLeftSelectionPaneRef = useRef(null);
  const bottomLeftSelectionPaneRef = useRef(null);
  const bottomRightSelectionPaneRef = useRef(null);

  const rowHeight = (index) => rowHeights[index];

  const columnWidth = (index) => columnWidths[index];

  const handleSelectionStart = (x1, y1) => eventListenerRef.current.startSelectionArea({ x1, y1, x2: x1, y2: y1 });

  const handleSelectionOver = (x2, y2) => eventListenerRef.current.updateSelectionArea({ x2, y2 });

  const handleDoubleClickEditableCell = () => eventListenerRef.current.setEditModeOn();

  const handleClickColumnHeader = (column) => eventListenerRef.current.selectColumnHeader(column);

  const handleClickRowHeader = (row) => eventListenerRef.current.selectRowHeader(row);

  const handleClickRootHeader = () => eventListenerRef.current.selectRootHeader();

  const itemData = { 
    sheetCellValues, 
    
    columnCount,
    rowCount,

    handleDoubleClickEditableCell,

    handleSelectionStart,
    handleSelectionOver,

    handleClickColumnHeader,
    handleClickRowHeader,
    handleClickRootHeader
  };

  freezeRowCount = freezeRowCount + 2;
  freezeColumnCount = freezeColumnCount + 0;

  const tableFreezeRowCount = freezeRowCount + 1;
  const tableFreezeColumnCount = freezeColumnCount + 1;

  const commonSelectionPaneProps = { sheetRef, sheetContainerRef, freezeRowCount, freezeColumnCount };

  return (
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
            <TopLeftActivityPane 
              key="top-left-selection-pane" 
              selectionRef={topLeftSelectionPaneRef} 
              {...commonSelectionPaneProps}
            />
          }
          extraTopRightElement={
            <TopRightActivityPane 
              key="top-right-activity-pane" 
              selectionRef={topRightSelectionPaneRef} 
              {...commonSelectionPaneProps}
            />  
          }
          extraBottomLeftElement={
            <BottomLeftActivityPane 
              key="bottom-left-activity-pane" 
              selectionRef={bottomLeftSelectionPaneRef} 
              {...commonSelectionPaneProps}
            />
          }
          extraBottomRightElement={
            <BottomRightActivityPane 
              key="bottom-right-activity-pane" 
              selectionRef={bottomRightSelectionPaneRef} 
              {...commonSelectionPaneProps}
            />
          }
        >
          {Cell}
        </VariableSizeGrid>
      )}
    </AutoSizer>
  );
};

SheetWindow = connect(mapStateToProps)(SheetWindow);

const Sheet = ({ sheet, sheetRef }) => {
  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);

  // ! Fix this for multi-selection
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
  
  return (
    <div ref={sheetContainerRef} className="sheet" tabIndex="0" onKeyDown={handleKeyDown}>
      <SheetWindow sheetRef={sheetRef} eventListenerRef={eventListenerRef} sheetContainerRef={sheetContainerRef}/>
      <EventListener sheet={sheet} eventListenerRef={eventListenerRef} sheetContainerRef={sheetContainerRef}/>
    </div>
  );
};

export default Sheet;