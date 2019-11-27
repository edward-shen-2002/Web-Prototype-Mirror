import XlsxPopulate from "xlsx-populate";

import { sheetNameRegex } from "./regex";

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
  sheetsColumnWidths,
  sheetsFreezeColumnCount,
  sheetsRowCount,
  sheetsRowHeights,
  sheetsFreezeRowCount
}) => {
  let Workbook = await XlsxPopulate.fromBlankAsync();
  const { x, y } = activeCellPosition;
  
  sheetNames.forEach((sheetName) => {
    const sheetCellData = sheetsCellData[sheetName];
    const sheetColumnCount = sheetsColumnCount[sheetName];
    const sheetColumnWidths = sheetsColumnWidths[sheetName];
    const sheetFreezeColumnCount = sheetsFreezeColumnCount[sheetName];
    const sheetRowCount = sheetsRowCount[sheetName];
    const sheetRowHeights = sheetsRowHeights[sheetName];
    const sheetFreezeRowCount = sheetsFreezeRowCount[sheetName];

    // May be a default sheet
    let sheet =  sheetName === "Sheet1" ? Workbook.sheet(sheetName) : Workbook.addSheet(sheetName);

    sheet.freezePanes(sheetFreezeColumnCount, sheetFreezeRowCount);

    for(let row = 1; row < sheetRowCount; row++) {
      for(let column = 1; column < sheetColumnCount; column++) {
        const { value } = sheetCellData[row][column];

        if(value) {
          const sheetCell = sheet.row(row).cell(column);
          sheetCell.setValue(value);
        }
      }
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