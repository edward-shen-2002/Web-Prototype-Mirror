import { createReducer } from "store/tools/setup";

const getLeftOffsets = (columnWidths) => {
  const columnWidthsLength = columnWidths.length;

  let leftOffsetTotal = 0;
  let leftOffsets = [ 0 ];

  for(let column = 1; column < columnWidthsLength; column++) {
    leftOffsetTotal += columnWidths[ column - 1 ];
    leftOffsets.push(leftOffsetTotal);
  }

  return leftOffsets;
};

const UPDATE_SHEETS_COLUMN_WIDTHS_DATA = (state, { sheetsColumnWidths }) => {
  let sheetsColumnWidthsData = {};

  for(let sheetName in sheetsColumnWidths) {
    const columnWidths = sheetsColumnWidths[sheetName];

    const leftOffsets = getLeftOffsets(columnWidths);

    sheetsColumnWidthsData[sheetName] = { columnWidths, leftOffsets };
  }

  return { ...state, ...sheetsColumnWidthsData };
};

const RESET_SHEETS_COLUMN_WIDTHS_DATA = () => ({});
const UPDATE_SHEET_COLUMN_WIDTHS_DATA = (state, { sheetName, columnWidths }) => ({
  ...state,
  [sheetName]: {
    columnWidths,
    leftOffsets: getLeftOffsets(sheetColumnWidths)
  }
});

const RESET_SHEET_COLUMN_WIDTHS_DATA = (state, { sheetName }) => ({
  ...state,
  [sheetName]: {}
});

const sheetsColumnWidthsDataReducer = createReducer({}, { 
  UPDATE_SHEETS_COLUMN_WIDTHS_DATA, 
  RESET_SHEETS_COLUMN_WIDTHS_DATA, 
  UPDATE_SHEET_COLUMN_WIDTHS_DATA,
  RESET_SHEET_COLUMN_WIDTHS_DATA
});

export default sheetsColumnWidthsDataReducer;
