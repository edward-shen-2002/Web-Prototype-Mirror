import XlsxPopulate from "xlsx-populate";

import { sheetNameRegex } from "./regex";

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
  
  sheetNames.forEach((sheetName) => {
    const sheetCellData = sheetsCellData[sheetName];
    const sheetColumnCount = sheetsColumnCount[sheetName];
    const sheetColumnWidths = sheetsColumnWidths[sheetName].columnWidths;
    const sheetFreezeColumnCount = sheetsFreezeColumnCount[sheetName];
    const sheetRowCount = sheetsRowCount[sheetName];
    const sheetRowHeights = sheetsRowHeightsData[sheetName].rowHeights;
    const sheetFreezeRowCount = sheetsFreezeRowCount[sheetName];

    // May be a default sheet
    let sheet =  sheetName === "Sheet1" ? Workbook.sheet(sheetName) : Workbook.addSheet(sheetName);

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
  });

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