import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import { updateSelectionArea } from "actions/ui/excel/selectionArea";
import { setIsSelectionModeOn, setIsSelectionModeOff } from "actions/ui/excel/isSelectionMode";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import Cell from "./Cell";
import { TopLeftSelectionPane, TopRightSelectionPane, BottomLeftSelectionPane, BottomRightSelectionPane } from "./SelectionPane";

import { 
  DEFAULT_EXCEL_ROWS, 
  DEFAULT_EXCEL_COLUMNS,

  DEFAULT_EXCEL_ROW_HEIGHT,
  DEFAULT_EXCEL_COLUMN_WIDTH,

  DEFAULT_EXCEL_ROW_HEIGHT_HIDDEN,
  DEFAULT_EXCEL_COLUMN_WIDTH_HIDDEN,
  
  DEFAULT_EXCEL_ROW_HEIGHT_HEADER,
  DEFAULT_EXCEL_COLUMN_WIDTH_HEADER
} from "constants/excel";

import "./Sheet.scss";

const handleActiveCellArrowEvent = (direction, activeCell, isActiveCellEditMode, handleSetActiveCell) => {
  if(!isActiveCellEditMode) {
    let { row, column } = activeCell;
    if(direction === "ArrowUp") {
      if(row > 1) row--;
    } else if(direction === "ArrowDown") {
      if(column < columnCount) column++;
    } else if(direction === "ArrowLeft") {
      if(column > 1) column--;
    } else {
      if(row < rowCount) row++;
    }

    if(row !== activeCell.row || column !== activeCell.column) handleSetActiveCell({ row, column });
  }
};

const initializeActiveCell = (sheet) => {
  const activeCell = { row: 1, column: 1 };

  const { row, column } = activeCell;
  sheet.activeCell(row, column);

  return activeCell;
};

const mapStateToProps = ({ ui: { excel: { isSelectionMode } } }) => ({ isSelectionMode });

const mapDispatchToProps = (dispatch) => ({
  handleUpdateSelectionArea: (selectionArea) => dispatch(updateSelectionArea(selectionArea)),
  handleSetSelectionModeOn: () => dispatch(setIsSelectionModeOn()),
  handleSetSelectionModeOff: () => dispatch(setIsSelectionModeOff())
});

let Sheet = ({ sheet, values, isSelectionMode, handleChangeCellValue, handleUpdateSelectionArea, handleSetSelectionModeOn, handleSetSelectionModeOff }) => {
  const [ columnCount, setColumnCount ] = useState(DEFAULT_EXCEL_COLUMNS + 1);
  const [ rowCount, setRowCount ] = useState(DEFAULT_EXCEL_ROWS + 1);

  const [ activeCell, setActiveCell ] = useState(initializeActiveCell(sheet));

  const [ isActiveCellEditMode, setIsActiveCellEditMode ] = useState(false);

  const [ isMounted, setIsMounted ] = useState(false);

  const sheetRef = useRef(null);

  const topLeftSelectionPaneRef = useRef(null);
  const topRightSelectionPaneRef = useRef(null);
  const bottomLeftSelectionPaneRef = useRef(null);
  const bottomRightSelectionPaneRef = useRef(null);

  const rowHeight = (index) => {
    let height;
    
    if(index === 0) {
      height = DEFAULT_EXCEL_ROW_HEIGHT_HEADER;
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

  const handleSetActiveCellEdit = () => setIsActiveCellEditMode(true);
  const handleSetActiveCellNormal = () => setIsActiveCellEditMode(false);

  // ! Consider header/column
  const handleSelectionStart = (x1, y1) => {
    if(!isSelectionMode) handleSetSelectionModeOn();
    handleUpdateSelectionArea({ x1, y1, x2: x1, y2: y1 });
  };

  // ! Consider header/column
  const handleSelectionOver = (x2, y2) => {
    if(isSelectionMode) handleUpdateSelectionArea({ x2, y2 });
  };

  const handleSelectionEnd = () => {
    handleSetSelectionModeOff();
  };

  useEffect(() => {
    if(!isMounted) {
      const { _maxColumnNumber, _maxRowNumber } = sheet.usedRange();
      setColumnCount(_maxColumnNumber + 1);
      setRowCount(_maxRowNumber + 1);
      setIsMounted(true);
    }
  });

  const itemData = { 
    sheet, 
    values, 
    activeCell, 
    isActiveCellEditMode, 
    
    columnCount,
    rowCount,
    isSelectionMode,

    handleSetActiveCell, 
    handleChangeCellValue, 
    handleSetActiveCellEdit, 
    handleSetActiveCellNormal,
    handleActiveCellArrowEvent,

    handleSelectionStart,
    handleSelectionOver,
    handleSelectionEnd
  };

  return (
    <div className="sheet">
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            ref={sheetRef}
            freezeRowCount={1}
            freezeColumnCount={1}
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={height}
            itemData={itemData}
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={width}
            extraTopLeftElement={<TopLeftSelectionPane key="top-left-selection-pane" selectionRef={topLeftSelectionPaneRef} sheetRef={sheetRef}/>}
            extraTopRightElement={<TopRightSelectionPane key="top-left-selection-pane" selectionRef={topRightSelectionPaneRef} sheetRef={sheetRef}/>}
            extraBottomLeftElement={<BottomLeftSelectionPane key="bottom-left-selection-pane" selectionRef={bottomLeftSelectionPaneRef} sheetRef={sheetRef}/>}
            extraBottomRightElement={<BottomRightSelectionPane key="bottom-right-selection-pane" selectionRef={bottomRightSelectionPaneRef} sheetRef={sheetRef}/>}
          >
          {Cell}
        </VariableSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
};

Sheet = connect(mapStateToProps, mapDispatchToProps)(Sheet);

export default Sheet;