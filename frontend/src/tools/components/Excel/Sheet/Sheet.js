import React, { useEffect } from "react";

import { connect } from "react-redux";

import { updateScrollData } from "@actions/ui/excel/scrollData";

import { VariableSizeGrid } from "react-window";

import { ContextMenuTrigger } from "react-contextmenu";

import AutoSizer from "react-virtualized-auto-sizer";

import memoize from "memoize-one";

import { inputCharacterRegex } from "@tools/regex";

import { getNormalRowHeight, getNormalColumnWidth } from "@tools/excel";

import ContextMenu from "./ContextMenu";

import WindowListener from "./WindowListener";

import Cell from "./Cell";

import TopLeftActivityPane from "./ActivityPane/TopLeftActivityPane";
import TopRightActivityPane from "./ActivityPane/TopRightActivityPane";
import BottomLeftActivityPane from "./ActivityPane/BottomLeftActivityPane";
import BottomRightActivityPane from "./ActivityPane/BottomRightActivityPane";

import { 
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER, 
  DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER
} from "@constants/excel";

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

// !Change this to spread instead of object?
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
  const tableFreezeRowCount = sheetFreezeRowCount + 1;
  const tableFreezeColumnCount = sheetFreezeColumnCount + 1;

  const rowHeight = (index) => index ? getNormalRowHeight(sheetRowHeights[index]) : DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER
  const columnWidth = (index) => index ? getNormalColumnWidth(sheetColumnWidths[index]) : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER;

  const handleSelectionStart = (x1, y1, ctrlKey, shiftKey) => eventListenerRef.current.startSelection(x1, y1, ctrlKey, shiftKey);
  const handleSelectionOver = (x2, y2, ctrlKey) => eventListenerRef.current.selectOver(x2, y2, ctrlKey);
  const handleDoubleClickEditableCell = () => eventListenerRef.current.doubleClickEditableCell();
  const handleClickColumnHeader = (column, ctrlKey) => eventListenerRef.current.clickColumnHeader(column, ctrlKey);
  const handleClickRowHeader = (row, ctrlKey) => eventListenerRef.current.clickRowHeader(row, ctrlKey);
  const handleClickRootHeader = () => eventListenerRef.current.selectAll();
  const handleChangeActiveInputData = (value) => eventListenerRef.current.changeActiveInputData(value);
  const handleRowDragStart = (row) => eventListenerRef.current.startRowDrag(row);
  const handleColumnDragStart = (column) => eventListenerRef.current.startColumnDrag(column);
  const handleScroll = (scrollData) => handleUpdateScrollData(scrollData); 
  const handleRightClickCell = (event, row, column) => eventListenerRef.current.rightClickCell(event, row, column);
  const handleCloseActiveCellDialog = () => eventListenerRef.current.resetActiveCellDialog();

  const handleChangeBusinessConcept = (type, concept) => eventListenerRef.current.changeBusinessConcept(type, concept);
  const handleAddComment = (comment) => eventListenerRef.current.addComment(comment);
  const handleDeleteComment = (commentId) => eventListenerRef.current.deleteComment(commentId);
  const handleSetPrepopulate = (prepopulateData) => eventListenerRef.current.setPrepopulate(prepopulateData)

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
    handleClickRootHeader,
    handleRightClickCell
  });

  const commonSelectionPaneProps = { 
    sheetGridRef, 
    handleChangeActiveInputData,
    handleCloseActiveCellDialog,
    handleChangeBusinessConcept,
    handleAddComment,
    handleDeleteComment,
    handleSetPrepopulate
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <ContextMenuTrigger 
          id="sheetWindowContainer"
          holdToDisplay={1000}
        >
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
        </ContextMenuTrigger>
      )}
    </AutoSizer>
  );
};

let Sheet = ({ 
  eventListenerRef, 
  sheetContainerRef, 
  sheetGridRef,

  cursorType,
  isEditMode,
  sheetCellData,
  sheetFreezeRowCount,
  sheetFreezeColumnCount,
  sheetColumnCount,
  sheetRowCount,
  sheetColumnWidths,
  sheetRowHeights,

  handleUpdateScrollData
}) => {
  const handleKeyDown = async (event) => {
    const { key, shiftKey, ctrlKey, altKey } = event;
    
    if(key === "ArrowUp") {
      eventListenerRef.current.arrowUp(event, shiftKey);
    } else if(key === "ArrowDown") {
      eventListenerRef.current.arrowDown(event, shiftKey);
    } else if(key === "ArrowLeft") {
      eventListenerRef.current.arrowLeft(event, shiftKey);
    } else if(key === "ArrowRight") {
      eventListenerRef.current.arrowRight(event, shiftKey);
    } else if(key === "Tab") {
      eventListenerRef.current.tab(event, shiftKey, sheetContainerRef);
    } else if(key === "Enter" && !ctrlKey && !altKey) {
      eventListenerRef.current.enter(event, shiftKey, sheetContainerRef);
    } else if(key === "Delete" || key === "Backspace") {
      eventListenerRef.current.delete();
    } else if(key === "Escape") {
      eventListenerRef.current.escape(sheetContainerRef);
    } else if(key === "s" && ctrlKey) {
      // ! Put this save higher up the component? In Excel container?
      event.preventDefault();
      eventListenerRef.current.save();
    } else if(key === "a" && ctrlKey) {
      eventListenerRef.current.selectAll(event);
    } else if(inputCharacterRegex.test(key)) {
      eventListenerRef.current.startEditMode();
    }
  };

  // https://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
  const handleDragStart = (event) => {
    let selection = window.getSelection ? window.getSelection() : document.selection;

    if (selection) {
      if (selection.removeAllRanges) {
        selection.removeAllRanges();
      } else if (selection.empty) {
        selection.empty();
      }
      
      event.preventDefault();
    }
  };

  // TODO
  const handlePaste = ({ clipboardData }) => {
    let paste = (clipboardData || window.clipboardData).getData("text/html");

    // console.log(paste);
  };

  const handleClick = () => eventListenerRef.current.setInputAutoFocusOn();

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
      onPaste={handlePaste}
    >
      <SheetWindow
        eventListenerRef={eventListenerRef}
        sheetGridRef={sheetGridRef}

        isEditMode={isEditMode}

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
        eventListenerRef={eventListenerRef}
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