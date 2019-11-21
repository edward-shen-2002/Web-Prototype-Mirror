import React, { useRef } from "react";

import { connect } from "react-redux";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import EventListener from "./EventListener";
import WindowListener from "./WindowListener";

import Cell from "./Cell";

import BottomRightActivityPane from "./ActivityPane/BottomRightActivityPane";
import TopRightActivityPane from "./ActivityPane/TopRightActivityPane";

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
  eventListenerRef
}) => {
  const sheetGridRef = useRef(null);
  
  const rowHeight = (index) => rowHeights[index];
  const columnWidth = (index) => columnWidths[index];

  const handleSelectionStart = (x1, y1, isMultiSelection) => {
    eventListenerRef.current.startSelection(x1, y1, isMultiSelection);
  };

  const handleSelectionOver = (x2, y2, isMultiSelection) => eventListenerRef.current.selectOver(x2, y2, isMultiSelection);

  const handleDoubleClickEditableCell = () => eventListenerRef.current.setEditModeOn();

  const handleClickColumnHeader = (column) => {};

  const handleClickRowHeader = (row) => {};

  const handleClickRootHeader = () => {};


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

  const tableFreezeRowCount = freezeRowCount + 1;
  const tableFreezeColumnCount = freezeColumnCount + 1;

  const commonSelectionPaneProps = { sheetGridRef };

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
          // extraTopLeftElement={
          //   <TopLeftActivityPane 
          //     key="top-left-selection-pane" 
          //     selectionRef={topLeftSelectionPaneRef} 
          //     {...commonSelectionPaneProps}
          //   />
          // }
          extraTopRightElement={
            <TopRightActivityPane 
              key="top-right-activity-pane" 
              {...commonSelectionPaneProps}
            />  
          }
          // extraBottomLeftElement={
          //   <BottomLeftActivityPane 
          //     key="bottom-left-activity-pane" 
          //     selectionRef={bottomLeftSelectionPaneRef} 
          //     {...commonSelectionPaneProps}
          //   />
          // }
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

const Sheet = ({ sheet }) => {
  const eventListenerRef = useRef(null);
  const sheetContainerRef = useRef(null);

  const handleKeyDown = (event) => {
    const { key, shiftKey, ctrlKey } = event;
    
    if(key === "ArrowUp") {
      eventListenerRef.current.arrowUp(event, shiftKey);
    } else if(key === "ArrowDown") {
      eventListenerRef.current.arrowDown(event, shiftKey);
    } else if(key === "ArrowLeft") {
      eventListenerRef.current.arrowLeft(event, shiftKey);
    } else if(key === "ArrowRight") {
      eventListenerRef.current.arrowRight(event, shiftKey);
    } 
  };
  
  return (
    <div ref={sheetContainerRef} className="sheet" tabIndex="0" onKeyDown={handleKeyDown}>
      <SheetWindow sheetContainerRef={sheetContainerRef} eventListenerRef={eventListenerRef}/>
      <EventListener sheet={sheet} eventListenerRef={eventListenerRef} sheetContainerRef={sheetContainerRef}/>
      <WindowListener eventListenerRef={eventListenerRef}/>
    </div>
  );
};

export default Sheet;