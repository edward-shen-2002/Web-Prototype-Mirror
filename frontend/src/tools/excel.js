import XlsxPopulate from "xlsx-populate";

import { sheetNameRegex } from "./regex";

import { EditorState, ContentState, RichUtils, SelectionState } from "draft-js";

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

let size = -1;

// This utility copied from "dom-helpers" package. -- from react-window
export function getScrollbarSize(recalculate = false) {
  if (size === -1 || recalculate) {
    const div = document.createElement('div');
    const style = div.style;
    style.width = '50px';
    style.height = '50px';
    style.overflow = 'scroll';

    ((document.body)).appendChild(div);

    size = div.offsetWidth - div.clientWidth;

    ((document.body)).removeChild(div);
  }

  return size;
}

// Copied from react-window
export const getEstimatedTotalHeight = (
  { rowCount },
  { rowMetadataMap, estimatedRowHeight, lastMeasuredRowIndex }
) => {
  let totalSizeOfMeasuredRows = 0;

  // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138
  if (lastMeasuredRowIndex >= rowCount) {
    lastMeasuredRowIndex = rowCount - 1;
  }

  if (lastMeasuredRowIndex >= 0) {
    const itemMetadata = rowMetadataMap[lastMeasuredRowIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }

  const numUnmeasuredItems = rowCount - lastMeasuredRowIndex - 1;
  const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedRowHeight;

  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};

// Copied from react-window
export const getEstimatedTotalWidth = (
  { columnCount },
  {
    columnMetadataMap,
    estimatedColumnWidth,
    lastMeasuredColumnIndex,
  }
) => {
  let totalSizeOfMeasuredRows = 0;

  // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138
  if (lastMeasuredColumnIndex >= columnCount) {
    lastMeasuredColumnIndex = columnCount - 1;
  }

  if (lastMeasuredColumnIndex >= 0) {
    const itemMetadata = columnMetadataMap[lastMeasuredColumnIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }

  const numUnmeasuredItems = columnCount - lastMeasuredColumnIndex - 1;
  const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedColumnWidth;

  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};

export const generateNewSheetName = (sheetNames) => {
  let uniqueSheetNumber = sheetNames.length + 1;

  sheetNames.forEach((name) => {
    const match = name.match(sheetNameRegex);

    if(match && uniqueSheetNumber <= match[1]) uniqueSheetNumber++;
  });

  return `Sheet${uniqueSheetNumber}`;
};

export const isPositionEqualArea = ({ x, y }, { x1, y1, x2, y2 }) => x === x1 && x === x2 && y === y1 && y === y2;

export const getWorkbookInstance = async ({
  activeSheetName,
  sheetNames,
  activeCellPosition,
  sheetsCellData,
  sheetsColumnCount,
  sheetsColumnWidthsData,
  sheetsFreezeColumnCount,
  sheetsRowCount,
  sheetsRowHeightsData,
  sheetsFreezeRowCount
}) => {
  let Workbook = await XlsxPopulate.fromBlankAsync();
  const { x, y } = activeCellPosition;

  const sheetNamesLength = sheetNames.length;

  for(let sheetNameIndex = 0; sheetNameIndex < sheetNamesLength; sheetNameIndex++) {
    const sheetName = sheetNames[sheetNameIndex];

    const sheetCellData = sheetsCellData[sheetName];
    const sheetColumnCount = sheetsColumnCount[sheetName];
    const sheetColumnWidths = sheetsColumnWidthsData[sheetName].columnWidths;
    const sheetFreezeColumnCount = sheetsFreezeColumnCount[sheetName];
    const sheetRowCount = sheetsRowCount[sheetName];
    const sheetRowHeights = sheetsRowHeightsData[sheetName].rowHeights;
    const sheetFreezeRowCount = sheetsFreezeRowCount[sheetName];

    // May be a default sheet
    let sheet =  sheetName === "Sheet1" ? await Workbook.sheet(sheetName) : await Workbook.addSheet(sheetName);

    sheet.freezePanes(sheetFreezeColumnCount, sheetFreezeRowCount);

    for(let row in sheetCellData) {
      row = parseInt(row);
      
      let columns = Object.keys(sheetCellData[row]);

      columns.forEach((column) => {
        column = parseInt(column);

        const { value } = sheetCellData[row][column];
  
        if(value) {
          const sheetCell = sheet.row(row).cell(column);
          sheetCell.setValue(value);
        }
      })
    }

    // Set row heights
    for(let row = 1; row < sheetRowCount; row++) {
      const sheetRowHeight = sheetRowHeights[row];
      sheet.row(row).height(sheetRowHeight);
    }

    // Set column widths
    for(let column = 1; column < sheetColumnCount; column++) {
      const sheetColumnWidth = sheetColumnWidths[column];
      sheet.column(column).width(sheetColumnWidth);
    }
  };

  // Set active sheet and cell
  const activeSheet = Workbook.sheet(activeSheetName);
  activeSheet.active(true);
  activeSheet.row(y).cell(x).active(true);

  return Workbook;
};

export const getCellData = (sheetCellData, row, column) => (
  sheetCellData[row] && sheetCellData[row][column]
    ? sheetCellData[row][column]
    : undefined
);


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

export const getColumnsData = (sheet, columnCount) => {
  let columnWidths = {};

  let hiddenColumns = {};

  for(let column = 1; column < columnCount; column++) {
    let width;

    const sheetColumn = sheet.column(column);

    if(sheetColumn.hidden()) hiddenColumns[column] = true;

    width = sheetColumn.width();
    if(width) columnWidths[column] = width;
  }

  return { columnWidths, hiddenColumns };
};

export const getRowsData = (sheet, rowCount) => {
  let rowHeights = {};

  let hiddenRows = {};

  for(let row = 1; row < rowCount; row++) {
    let height;
    const sheetRow = sheet.row(row);

    if(sheetRow.hidden()) hiddenRows[row] = true;

    height = sheetRow.height();
    if(height) rowHeights[row] = height;
  }

  return { rowHeights, hiddenRows };
};

export const extractCellStyle = (cellData) => {
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

  return isObjectEmpty(cellStyles) ? undefined : cellStyles;
};

const extractCellData = (cellData) => {
  const cellValue = cellData.value();

  const cellFormula = cellData.formula();
  const cellStyles = extractCellStyle(cellData);
  // !! TODO May be internal - ie in another sheet
  // const cellHyperlinkData = cellData.hyperlink();

  let extractedCellData = {};

  if(cellValue) extractedCellData.value = cellValue;
  if(cellFormula) extractedCellData.formula = cellFormula;
  if(cellStyles) extractedCellData.styles = cellStyles;

  return isObjectEmpty(extractedCellData) ? undefined : extractedCellData;
};

export const getSheetCellData = (sheet, columnCount, rowCount) => {
  let sheetCellData = {};

  for(let row = 0; row < rowCount; row++) {
    for(let column = 0; column < columnCount; column++) {
      if(row && column) {
        const cellData = extractCellData(sheet.row(row).cell(column));

        if(cellData) {
          if(!sheetCellData[row]) sheetCellData[row] = {};

          sheetCellData[row][column] = cellData;
        }
      } 
    }
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

export const convertRichTextToEditorState = (richText) => {
  const richTextLength = richText.length;

  let editorState = EditorState.createEmpty();
  
  for(let fragmentIndex = 0; fragmentIndex < richTextLength; fragmentIndex++) {
    const fragment = richText.get(fragmentIndex);

    const fragmentStyles = extractCellStyle(fragment);

    if(fragmentStyles) {
      editorState = RichUtils.toggleInlineStyle(
        editorState,
        fragmentStyles
      );

      const fragmentText = fragment.value();

      editorState = EditorState.push(
        editorState,
        ContentState.createFromText(fragmentText ? fragmentText : ""),
        "change-inline-style"
      );
    }
  }

  return EditorState.moveFocusToEnd(editorState);
};

export const convertTextToEditorState = (text) => {
  if(text !== undefined && typeof text !== "string") text = text.toString();

  return (
    EditorState.moveFocusToEnd((
      text 
        ? EditorState.createWithContent(ContentState.createFromText(text)) 
        : EditorState.createEmpty()
    ))
  );
}
