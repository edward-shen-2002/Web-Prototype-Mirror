import { 
  DEFAULT_EXCEL_SHEET_ROW_COUNT, 
  DEFAULT_EXCEL_SHEET_COLUMN_COUNT,

  DEFAULT_EXCEL_SHEET_ROW_HEIGHT,
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH,

  DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HIDDEN,
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HIDDEN,
  
  DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER,
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER,

  DEFAULT_EXCEL_SHEET_FREEZE_ROW_COUNT,
  DEFAULT_EXCEL_SHEET_FREEZE_COLUMN_COUNT
} from "constants/excel";


export const getHeaderCount = (sheet) => {
  const sheetUsedRange = sheet.usedRange();

  let headerCount = {};

  if(sheetUsedRange) {
    const { _maxColumnNumber, _maxRowNumber } = sheetUsedRange;

    headerCount.columnCount = _maxColumnNumber + 1;
    headerCount.rowCount = _maxRowNumber + 1;
  } else {
    headerCount.columnCount = DEFAULT_EXCEL_SHEET_COLUMN_COUNT + 1;
    headerCount.rowCount = DEFAULT_EXCEL_SHEET_ROW_COUNT + 1;
  }

  return headerCount;
};

export const getColumnWidths = (sheet) => {
  let columnWidths = [ DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER ];

  for(let column = 1; column <= DEFAULT_EXCEL_SHEET_COLUMN_COUNT; column++) {
    let width;

    const sheetColumn = sheet.column(column);

    if(sheetColumn.hidden()) {
      width = DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HIDDEN;
    } else {
      width = sheetColumn.width();

      if(!width) width = DEFAULT_EXCEL_SHEET_COLUMN_WIDTH
    }

    columnWidths.push(width);
  }

  return columnWidths;
};

export const getRowHeights = (sheet) => {
  let rowHeights = [ DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER ];

  for(let row = 1; row <= DEFAULT_EXCEL_SHEET_ROW_COUNT; row++) {
    let height;
    const sheetRow = sheet.row(row);

    if(sheetRow.hidden()) {
      height = DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HIDDEN;
    } else {
      height = sheetRow.height();

      if(!height) height = DEFAULT_EXCEL_SHEET_ROW_HEIGHT;
    }

    rowHeights.push(height);
  }

  return rowHeights;
};

export const getSheetCellData = (sheet) => {
  let sheetCellData = [];

  for(let row = 0; row <= DEFAULT_EXCEL_SHEET_ROW_COUNT; row++) {
    let rowValues = [];
    for(let column = 0; column <= DEFAULT_EXCEL_SHEET_COLUMN_COUNT; column++) {
      // ! Check undefined

      if(row && column) {
        const cellValue = sheet.row(row).cell(column).value();
        rowValues.push({ value: cellValue ? cellValue: "" });
      } else {
        rowValues.push({ value: null });
      }
    }

    sheetCellData.push(rowValues);
  }

  return sheetCellData;
};

export const getFreezeHeader = (sheet) => {
  const freezeHeader = {};
  
  const panes = sheet.panes();
          
  if(panes && panes.state === "frozen") {
    freezeHeader.freezeRowCount = panes.ySplit;
    freezeHeader.freezeColumnCount = panes.xSplit;
  } else {
    freezeHeader.freezeRowCount = DEFAULT_EXCEL_SHEET_FREEZE_ROW_COUNT;
    freezeHeader.freezeColumnCount = DEFAULT_EXCEL_SHEET_FREEZE_COLUMN_COUNT; 
  }

  return freezeHeader;
};