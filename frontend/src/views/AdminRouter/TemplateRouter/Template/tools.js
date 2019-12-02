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

import { isObjectEmpty } from "tools/misc";

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

const extractCellStyle = (cellData) => {
  let cellStyles = (
    cellData
      ? cellData.style([
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "subscript",
          "superscript",
          "fontSize",
          "fontFamily",
          "fontGenericFamily",
          "fontScheme",
          "fontColor",
          "horizontalAlignment",
          "justifyLastLine",
          "indent",
          "verticalAlignment",
          "wrapText",
          "shrinkToFit",
          "textDirection",
          "textRotation",
          "angleTextCounterclockwise",
          "angleTextClockwise",
          "rotateTextUp",
          "rotateTextDown",
          "verticalText",
          "fill",
          "border",
          "borderColor",
          "borderStyle",
          "leftBorder", 
          "rightBorder", 
          "topBorder", 
          "bottomBorder", 
          "diagonalBorder",
          "diagonalBorderDirection", 
          "numberFormat"
        ])
      : {}
  );

  for(let styleName in cellStyles) {
    const styleValue = cellStyles[styleName];

    if(!styleValue) delete cellStyles[styleName];
  }

  if(cellStyles.numberFormat === "General") delete cellStyles["numberFormat"];

  if(isObjectEmpty(cellStyles.border)) delete cellStyles["border"]; 

  return isObjectEmpty(extractCellStyle) ? undefined : cellData;
};

const extractCellData = (cellData) => {
  const cellValue = cellData.value();
  const cellFormula = cellData.formula();
  const cellStyles = extractCellStyle(cellData);
  // !! TODO May be internal - ie in another sheet
  // const cellHyperlinkData = cellData.hyperlink();

  return {
    value: cellValue ? cellValue : undefined,
    styles: cellStyles,
    formula: cellFormula
  };
};

export const getSheetCellData = (sheet) => {
  let sheetCellData = [];

  for(let row = 0; row <= DEFAULT_EXCEL_SHEET_ROW_COUNT; row++) {
    let rowData = [];
    for(let column = 0; column <= DEFAULT_EXCEL_SHEET_COLUMN_COUNT; column++) {
      if(row && column) {
        const cellData = extractCellData(sheet.row(row).cell(column));

        rowData.push(cellData);
      } else {
        rowData.push(undefined);
      }
    }

    sheetCellData.push(rowData);
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

// ! TODO
export const getCellOffsets = (rowHeights, columnWidths) => {
  const rowHeightsLength = rowHeights.length;
  const columnWidthsLength = columnWidths.length;

  let offsets = [];

  let topOffsetTotal = 0;
  let topOffsets = [ 0 ];

  // Do not include the last element total. We're only concered with the top (beginning, not end/bottom)
  for(let row = 1; row < rowHeightsLength; row ++) {
    topOffsetTotal += rowHeights[ row - 1 ];
    topOffsets.push(topOffsetTotal);
  }

  let leftOffsetTotal = 0;
  let leftOffsets = [ 0 ];

  for(let column = 1; column < columnWidthsLength; column++) {
    leftOffsetTotal += columnWidths[ column - 1 ];
    leftOffsets.push(leftOffsetTotal);
  }

  for(let row = 0; row < rowHeightsLength; row++) {
    let rowOffsets = [];
    for(let column = 0; column < columnWidthsLength; column++) rowOffsets.push({ top: topOffsets[row], left: leftOffsets[column], height: rowHeights[row], width: columnWidths[column] });

    offsets.push(rowOffsets);
  }

  return offsets;
};