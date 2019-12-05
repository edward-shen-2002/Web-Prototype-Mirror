import React, { useEffect, useMemo } from "react";

import { connect } from "react-redux";

import { updateScrollData } from "actions/ui/excel/scrollData";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import memoize from "memoize-one";

import { inputCharacterRegex } from "tools/regex";

import { getNormalRowHeight, getNormalColumnWidth } from "tools/excel";

import WindowListener from "./WindowListener";

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
  sheetCellData: sheetsCellData[activeSheetName],
  sheetColumnCount: sheetsColumnCount[activeSheetName],
  sheetRowCount: sheetsRowCount[activeSheetName],
  sheetColumnWidths: sheetsColumnWidths[activeSheetName],
  sheetRowHeights: sheetsRowHeights[activeSheetName],
  sheetFreezeRowCount: sheetsFreezeRowCount[activeSheetName],
  sheetFreezeColumnCount: sheetsFreezeColumnCount[activeSheetName]
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateScrollData: (scrollData) => dispatch(updateScrollData(scrollData)),
});

const createItemData = memoize((    
  sheetCellData, 
    
  columnCount,
  rowCount,

  handleDoubleClickEditableCell,

  handleSelectionStart,
  handleSelectionOver,

  handleClickColumnHeader,
  handleClickRowHeader,
  handleClickRootHeader
) => ({
  sheetCellData, 
    
  columnCount,
  rowCount,

  handleDoubleClickEditableCell,

  handleSelectionStart,
  handleSelectionOver,

  handleClickColumnHeader,
  handleClickRowHeader,
  handleClickRootHeader,
}));

let SheetWindow = ({
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

  const tableColumnWidths = useMemo(() => {
    let columnWidths = [ DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER ];

    for(let column = 1; column < sheetColumnCount; column ++) columnWidths.push(getNormalColumnWidth(sheetColumnWidths[column]));

    return columnWidths;
  });

  const tableRowHeights = useMemo(() => {
    let rowHeights = [ DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER ];

    for(let row = 1; row < sheetRowCount; row++) rowHeights.push(getNormalRowHeight(sheetRowHeights[row]));

    return rowHeights;
  });

  const tableFreezeRowCount = sheetFreezeRowCount + 1;
  const tableFreezeColumnCount = sheetFreezeColumnCount + 1;

  const rowHeight = (index) => tableRowHeights[index];
  const columnWidth = (index) => tableColumnWidths[index];

  const handleSelectionStart = (x1, y1, ctrlKey, shiftKey) => EventListenerInstance.startSelection(x1, y1, ctrlKey, shiftKey);

  const handleSelectionOver = (x2, y2, ctrlKey) => EventListenerInstance.selectOver(x2, y2, ctrlKey);

  const handleDoubleClickEditableCell = () => EventListenerInstance.doubleClickEditableCell();

  const handleClickColumnHeader = (column, ctrlKey) => EventListenerInstance.clickColumnHeader(column, ctrlKey);

  const handleClickRowHeader = (row, ctrlKey) => EventListenerInstance.clickRowHeader(row, ctrlKey);

  const handleClickRootHeader = () => EventListenerInstance.selectAll();

  const handleChangeActiveInputData = (value) => EventListenerInstance.changeActiveInputData(value);

  const handleScroll = (scrollData) => handleUpdateScrollData(scrollData); 

  const itemData = createItemData(
    sheetCellData, 
    
    sheetColumnCount,
    sheetRowCount,

    handleDoubleClickEditableCell,

    handleSelectionStart,
    handleSelectionOver,

    handleClickColumnHeader,
    handleClickRowHeader,
    handleClickRootHeader
  );

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

SheetWindow = connect(mapStateToProps, mapDispatchToProps)(SheetWindow);

const Sheet = ({ 
  eventListenerRef, 
  sheetContainerRef, 
  sheetGridRef
}) => {
  let EventListenerInstance;

  useEffect(() => {
    EventListenerInstance = eventListenerRef.current;
  });

  const handleKeyDown = (event) => {
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
    } else if(key === "a" && ctrlKey) {
      EventListenerInstance.selectAll(event);
    } else if(inputCharacterRegex.test(key)) {
      EventListenerInstance.startEditMode();
    }
  };

  // https://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
  const handleDragStart = () => {
    var selection = window.getSelection ? window.getSelection() : document.selection;

    if (selection) {
      if (selection.removeAllRanges) {
        selection.removeAllRanges();
      } else if (sel.empty) {
        selection.empty();
      }
      
      event.preventDefault();
    }
  };

  const handleClick = () => {
    EventListenerInstance.setInputAutoFocusOn();
  };

  return (
    <div 
      ref={sheetContainerRef} 
      className="sheet" 
      tabIndex="0" 
      onKeyDown={handleKeyDown}
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      <SheetWindow 
        sheetContainerRef={sheetContainerRef} 
        eventListenerRef={eventListenerRef}
        sheetGridRef={sheetGridRef}
      />
      
      <WindowListener eventListenerRef={eventListenerRef}/>
    </div>
  );
};

export default Sheet;