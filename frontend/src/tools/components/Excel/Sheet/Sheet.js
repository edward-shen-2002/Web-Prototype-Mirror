import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { updateScrollData } from "actions/ui/excel/scrollData";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import memoize from "memoize-one";

import { inputCharacterRegex } from "tools/regex";

import { getNormalRowHeight, getNormalColumnWidth } from "tools/excel";

import WindowListener from "./WindowListener";

import ContextMenu from "./ContextMenu";

import Cell from "./Cell";

import TopLeftActivityPane from "./ActivityPane/TopLeftActivityPane";
import TopRightActivityPane from "./ActivityPane/TopRightActivityPane";
import BottomLeftActivityPane from "./ActivityPane/BottomLeftActivityPane";
import BottomRightActivityPane from "./ActivityPane/BottomRightActivityPane";

import { 
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER, 
  DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER
} from "constants/excel";

import "./Sheet.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      cursorType,
      sheetCellData,
      sheetColumnCount,
      sheetRowCount,
      sheetColumnWidths,
      sheetRowHeights,
      sheetFreezeRowCount,
      sheetFreezeColumnCount
    }
  }
}) => ({
  cursorType,
  sheetCellData,
  sheetColumnCount,
  sheetRowCount,
  sheetColumnWidths,
  sheetRowHeights,
  sheetFreezeRowCount,
  sheetFreezeColumnCount
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateScrollData: (scrollData) => dispatch(updateScrollData(scrollData)),
});

const createItemData = memoize((itemData) => (itemData));

const SheetWindow = ({
  sheetGridRef,
  eventListenerRef,

  sheetCellData,
  sheetFreezeRowCount,
  sheetFreezeColumnCount,
  sheetColumnCount,
  sheetRowCount,
  sheetColumnWidths,
  sheetRowHeights,

  handleUpdateScrollData
}) => {
  let EventListenerInstance;

  useEffect(() => {
    EventListenerInstance = eventListenerRef.current;
  });

  const tableFreezeRowCount = sheetFreezeRowCount + 1;
  const tableFreezeColumnCount = sheetFreezeColumnCount + 1;

  const rowHeight = (index) => index ? getNormalRowHeight(sheetRowHeights[index]) : DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER
  const columnWidth = (index) => index ? getNormalColumnWidth(sheetColumnWidths[index]) : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER;

  const handleSelectionStart = (x1, y1, ctrlKey, shiftKey) => EventListenerInstance.startSelection(x1, y1, ctrlKey, shiftKey);
  const handleSelectionOver = (x2, y2, ctrlKey) => EventListenerInstance.selectOver(x2, y2, ctrlKey);
  const handleDoubleClickEditableCell = () => EventListenerInstance.doubleClickEditableCell();
  const handleClickColumnHeader = (column, ctrlKey) => EventListenerInstance.clickColumnHeader(column, ctrlKey);
  const handleClickRowHeader = (row, ctrlKey) => EventListenerInstance.clickRowHeader(row, ctrlKey);
  const handleClickRootHeader = () => EventListenerInstance.selectAll();
  const handleChangeActiveInputData = (value) => EventListenerInstance.changeActiveInputData(value);
  const handleRowDragStart = (row) => EventListenerInstance.startRowDrag(row);
  const handleColumnDragStart = (column) => EventListenerInstance.startColumnDrag(column);
  const handleScroll = (scrollData) => handleUpdateScrollData(scrollData); 

  const itemData = createItemData({
    sheetCellData, 
    
    sheetColumnCount,
    sheetRowCount,

    handleDoubleClickEditableCell,

    handleSelectionStart,
    handleSelectionOver,

    handleRowDragStart,
    handleColumnDragStart,

    handleClickColumnHeader,
    handleClickRowHeader,
    handleClickRootHeader
  });

  const commonSelectionPaneProps = { sheetGridRef, handleChangeActiveInputData };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeGrid
          ref={sheetGridRef}
          freezeRowCount={tableFreezeRowCount}
          freezeColumnCount={tableFreezeColumnCount}
          columnCount={sheetColumnCount}
          columnWidth={columnWidth}
          height={height}
          itemData={itemData}
          rowCount={sheetRowCount}
          rowHeight={rowHeight}
          width={width}
          onScroll={handleScroll}
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

let Sheet = ({ 
  eventListenerRef, 
  sheetContainerRef, 
  sheetGridRef,

  cursorType,
  sheetCellData,
  sheetFreezeRowCount,
  sheetFreezeColumnCount,
  sheetColumnCount,
  sheetRowCount,
  sheetColumnWidths,
  sheetRowHeights,

  handleUpdateScrollData
}) => {
  const [ contextMenuData, setContextMenuData ] = useState({ isOpen: false, anchorEl: null });
  let EventListenerInstance;

  useEffect(() => {
    EventListenerInstance = eventListenerRef.current;
  });

  const handleKeyDown = async (event) => {
    const { key, shiftKey, ctrlKey, altKey } = event;
    
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
    } else if(key === "Enter" && !ctrlKey && !altKey) {
      EventListenerInstance.enter(event, shiftKey, sheetContainerRef);
    } else if(key === "Delete" || key === "Backspace") {
      EventListenerInstance.delete();
    } else if(key === "Escape") {
      EventListenerInstance.escape(sheetContainerRef);
    } else if(key === "s" && ctrlKey) {
      // ! Put this save higher up the component? In Excel container?
      event.preventDefault();
      EventListenerInstance.save();
    } else if(key === "a" && ctrlKey) {
      EventListenerInstance.selectAll(event);
    } else if(inputCharacterRegex.test(key)) {
      EventListenerInstance.startEditMode();
    }
  };

  // https://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
  const handleDragStart = () => {
    let selection = window.getSelection ? window.getSelection() : document.selection;

    if (selection) {
      if (selection.removeAllRanges) {
        selection.removeAllRanges();
      } else if (sel.empty) {
        selection.empty();
      }
      
      event.preventDefault();
    }
  };

  const handlePaste = ({ clipboardData }) => {
    let paste = (clipboardData || window.clipboardData).getData("text/html");

    console.log(paste);
  };

  const handleClick = () => EventListenerInstance.setInputAutoFocusOn();

  const handleOpenContextMenu = (event) => {
    event.preventDefault();

    const anchorEl = event.currentTarget;
    setContextMenuData({ isOpen: true, anchorEl });
  };

  const handleCloseContextMenu = () => setContextMenuData({ isOpen: false, anchorEl: null });

  let style = {};

  if(cursorType !== "default") style.cursor = cursorType;

  return (
    <div 
      ref={sheetContainerRef} 
      className="sheet" 
      style={style}
      tabIndex="0" 
      onKeyDown={handleKeyDown}
      onDragStart={handleDragStart}
      onClick={handleClick}
      onContextMenu={handleOpenContextMenu}
      onPaste={handlePaste}
    >
      <SheetWindow 
        sheetContainerRef={sheetContainerRef} 
        eventListenerRef={eventListenerRef}
        sheetGridRef={sheetGridRef}

        sheetCellData={sheetCellData}
        sheetFreezeRowCount={sheetFreezeRowCount}
        sheetFreezeColumnCount={sheetFreezeColumnCount}
        sheetColumnCount={sheetColumnCount}
        sheetRowCount={sheetRowCount}
        sheetColumnWidths={sheetColumnWidths}
        sheetRowHeights={sheetRowHeights}
      
        handleUpdateScrollData={handleUpdateScrollData}
      />
      <ContextMenu 
        handleCloseContextMenu={handleCloseContextMenu}
        {...contextMenuData} 
      />
      <WindowListener 
        eventListenerRef={eventListenerRef}
        sheetContainerRef={sheetContainerRef}
      />
    </div>
  );
};

Sheet = connect(mapStateToProps, mapDispatchToProps)(Sheet);

export default Sheet;