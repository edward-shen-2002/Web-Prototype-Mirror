import React, { useRef, useEffect } from "react";

import { connect } from "react-redux";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import EventListener from "./EventListener";
import WindowListener from "./WindowListener";

import Cell from "./Cell";

import TopLeftActivityPane from "./ActivityPane/TopLeftActivityPane";
import TopRightActivityPane from "./ActivityPane/TopRightActivityPane";
import BottomLeftActivityPane from "./ActivityPane/BottomLeftActivityPane";
import BottomRightActivityPane from "./ActivityPane/BottomRightActivityPane";

import "./Sheet.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      sheetCellData,
      columnCount,
      rowCount,
      columnWidths,
      rowHeights,
      freezeRowCount,
      freezeColumnCount
    }
  }
}) => ({
  sheetCellData,
  columnCount,
  rowCount,
  columnWidths,
  rowHeights,
  freezeRowCount,
  freezeColumnCount
});

let SheetWindow = ({
  sheetCellData,
  freezeRowCount,
  freezeColumnCount,
  columnCount,
  rowCount,
  columnWidths,
  rowHeights,
  eventListenerRef
}) => {
  const sheetGridRef = useRef(null);

  let EventListenerInstance;

  useEffect(() => {
    EventListenerInstance = eventListenerRef.current;
  });
  
  const rowHeight = (index) => rowHeights[index];
  const columnWidth = (index) => columnWidths[index];

  const handleSelectionStart = (x1, y1, ctrlKey) => EventListenerInstance.startSelection(x1, y1, ctrlKey);

  const handleSelectionOver = (x2, y2, ctrlKey) => EventListenerInstance.selectOver(x2, y2, ctrlKey);

  const handleDoubleClickEditableCell = () => EventListenerInstance.setEditModeOn();

  const handleClickColumnHeader = (column, ctrlKey) => EventListenerInstance.clickColumnHeader(column, ctrlKey);

  const handleClickRowHeader = (row, ctrlKey) => EventListenerInstance.clickRowHeader(row, ctrlKey);

  const handleClickRootHeader = () => EventListenerInstance.clickRootHeader();
  
  const handleChangeValue = (row, column, value) => EventListenerInstance.changeValue(row, column, value);

  const itemData = { 
    sheetCellData, 
    
    columnCount,
    rowCount,

    handleDoubleClickEditableCell,

    handleSelectionStart,
    handleSelectionOver,

    handleClickColumnHeader,
    handleClickRowHeader,
    handleClickRootHeader
  };

  const tableFreezeRowCount = freezeRowCount + 1;
  const tableFreezeColumnCount = freezeColumnCount + 1;

  const commonSelectionPaneProps = { 
    sheetGridRef, 

    handleChangeValue 
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeGrid
          ref={sheetGridRef}
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
              {...commonSelectionPaneProps}
            />
          }
          extraTopRightElement={
            <TopRightActivityPane 
              key="top-right-activity-pane" 
              {...commonSelectionPaneProps}
            />  
          }
          extraBottomLeftElement={
            <BottomLeftActivityPane 
              key="bottom-left-activity-pane" 
              {...commonSelectionPaneProps}
            />
          }
          extraBottomRightElement={
            <BottomRightActivityPane 
              key="bottom-right-activity-pane" 
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

const Sheet = () => {
  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);

  const handleKeyDown = (event) => {
    const { key, shiftKey } = event;
    const { current: EventListenerInstance } = eventListenerRef;
    
    if(key === "ArrowUp") {
      EventListenerInstance.arrowUp(event, shiftKey);
    } else if(key === "ArrowDown") {
      EventListenerInstance.arrowDown(event, shiftKey);
    } else if(key === "ArrowLeft") {
      EventListenerInstance.arrowLeft(event, shiftKey);
    } else if(key === "ArrowRight") {
      EventListenerInstance.arrowRight(event, shiftKey);
    } else if(key === "Tab") {
      EventListenerInstance.tab(event, shiftKey, sheetContainerRef);
    } else if(key === "Enter") {
      EventListenerInstance.enter(event, shiftKey, sheetContainerRef);
    }
  };
  
  return (
    <div ref={sheetContainerRef} className="sheet" tabIndex="0" onKeyDown={handleKeyDown}>
      <SheetWindow sheetContainerRef={sheetContainerRef} eventListenerRef={eventListenerRef}/>
      <EventListener eventListenerRef={eventListenerRef}/>
      <WindowListener eventListenerRef={eventListenerRef}/>
    </div>
  );
};

export default Sheet;