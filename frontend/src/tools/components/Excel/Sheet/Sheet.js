import React, { useEffect } from "react";

import { connect } from "react-redux";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import { inputCharacterRegex } from "tools/regex";

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
      activeSheetName,
      sheetsCellData,
      sheetsColumnCount,
      sheetsRowCount,
      sheetsColumnWidths,
      sheetsRowHeights,
      sheetsFreezeRowCount,
      sheetsFreezeColumnCount
    }
  }
}) => ({
  activeSheetName,
  sheetsCellData,
  sheetsColumnCount,
  sheetsRowCount,
  sheetsColumnWidths,
  sheetsRowHeights,
  sheetsFreezeRowCount,
  sheetsFreezeColumnCount
});

let SheetWindow = ({
  activeSheetName,
  sheetsCellData,
  sheetsFreezeRowCount,
  sheetsFreezeColumnCount,
  sheetsColumnCount,
  sheetsRowCount,
  sheetsColumnWidths,
  sheetsRowHeights,
  eventListenerRef
}) => {
  let EventListenerInstance;

  useEffect(() => {
    EventListenerInstance = eventListenerRef.current;
  });

  const rowHeights = sheetsRowHeights[activeSheetName];
  const columnWidths = sheetsColumnWidths[activeSheetName];
  const tableFreezeRowCount = sheetsFreezeRowCount[activeSheetName] + 1;
  const tableFreezeColumnCount = sheetsFreezeColumnCount[activeSheetName] + 1;
  const rowCount = sheetsRowCount[activeSheetName];
  const columnCount = sheetsColumnCount[activeSheetName];
  const sheetCellData = sheetsCellData[activeSheetName];

  const rowHeight = (index) => rowHeights[index];
  const columnWidth = (index) => columnWidths[index];

  const handleSelectionStart = (x1, y1, ctrlKey, shiftKey) => EventListenerInstance.startSelection(x1, y1, ctrlKey, shiftKey);

  const handleSelectionOver = (x2, y2, ctrlKey) => EventListenerInstance.selectOver(x2, y2, ctrlKey);

  const handleDoubleClickEditableCell = () => EventListenerInstance.doubleClickEditableCell();

  const handleClickColumnHeader = (column, ctrlKey) => EventListenerInstance.clickColumnHeader(column, ctrlKey);

  const handleClickRowHeader = (row, ctrlKey) => EventListenerInstance.clickRowHeader(row, ctrlKey);

  const handleClickRootHeader = () => EventListenerInstance.selectAll();

  const handleChangeActiveInputValue = (value) => EventListenerInstance.changeActiveInputValue(value);


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

  const commonSelectionPaneProps = { handleChangeActiveInputValue };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeGrid
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

const Sheet = ({ eventListenerRef, sheetContainerRef }) => {
  const handleKeyDown = (event) => {
    const { key, shiftKey, ctrlKey } = event;
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
    } else if(key === "Delete" || key === "Backspace") {
      EventListenerInstance.delete();
    } else if(key === "Escape") {
      EventListenerInstance.escape(sheetContainerRef);
    } else if(key === "a" && ctrlKey) {
      EventListenerInstance.selectAll(event);
    } else if(inputCharacterRegex.test(key)) {
      EventListenerInstance.startEditMode();
    }
  };
  
  return (
    <div ref={sheetContainerRef} className="sheet" tabIndex="0" onKeyDown={handleKeyDown}>
      <SheetWindow sheetContainerRef={sheetContainerRef} eventListenerRef={eventListenerRef}/>
      
      <WindowListener eventListenerRef={eventListenerRef}/>
    </div>
  );
};

export default Sheet;