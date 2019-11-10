import React, { useState, useEffect } from "react";

import { VariableSizeGrid } from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";

import Cell from "./Cell";

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

const SheetView = ({ height, width, values, sheet, handleChangeCellValue }) => {
  const [ columnCount, setColumnCount ] = useState(DEFAULT_EXCEL_COLUMNS + 1);
  const [ rowCount, setRowCount ] = useState(DEFAULT_EXCEL_ROWS + 1);

  const [ activeCell, setActiveCell ] = useState({ row: 1, column: 1 });
  const [ isActiveCellEditMode, setIsActiveCellEditMode ] = useState(false);

  const [ isMounted, setIsMounted ] = useState(false);

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

  const handleSetActiveCell = ({ row, column }) => setActiveCell({ row, column });

  const handleSetActiveCellEdit = () => setIsActiveCellEditMode(true);
  const handleSetActiveCellNormal = () => setIsActiveCellEditMode(false);

  useEffect(() => {
    if(!isMounted) {
      const { _maxColumnNumber, _maxRowNumber } = sheet.usedRange();
      setColumnCount(_maxColumnNumber + 1);
      setRowCount(_maxRowNumber + 1);
      setIsMounted(true);
    }
  });

  console.log(activeCell, isActiveCellEditMode)

  const itemData = { sheet, values, activeCell, isActiveCellEditMode, handleSetActiveCell, handleChangeCellValue, handleSetActiveCellEdit, handleSetActiveCellNormal };

  return (
    <VariableSizeGrid
      freezeRowCount={1}
      freezeColumnCount={1}
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={height}
      itemData={itemData}
      rowCount={rowCount}
      rowHeight={rowHeight}
      width={width}
    >
      {Cell}
    </VariableSizeGrid>
  );
};

const Sheet = ({ sheet, values, handleChangeCellValue }) => {
  

  return (
    <div className="sheet">
      <AutoSizer>
        {({ height, width }) => (
          <SheetView 
            height={height} 
            width={width} 
            values={values} 
            sheet={sheet} 
            handleChangeCellValue={handleChangeCellValue}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default Sheet;