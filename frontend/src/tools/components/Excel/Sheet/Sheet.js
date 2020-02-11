import React, { useCallback } from "react";

import { connect } from "react-redux";

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
  sheetRowHeights
}) => {
  const tableFreezeRowCount = sheetFreezeRowCount + 1;
  const tableFreezeColumnCount = sheetFreezeColumnCount + 1;

  const rowHeight = useCallback(
    (index) => index ? getNormalRowHeight(sheetRowHeights[index]) : DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER,
    [ sheetRowHeights ]
  );

  const columnWidth = useCallback(
    (index) => index ? getNormalColumnWidth(sheetColumnWidths[index]) : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER,
    [ sheetColumnWidths ]
  );

  const handleScroll = (scrollData) => eventListenerRef.current.scroll(scrollData); 

  const itemData = createItemData({
    sheetCellData, 
    
    sheetColumnCount,
    sheetRowCount,

    eventListenerRef
  });

  const commonSelectionPaneProps = { 
    sheetGridRef, 
    eventListenerRef
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
  sheetRowHeights
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

Sheet = connect(mapStateToProps)(Sheet);

export default Sheet;