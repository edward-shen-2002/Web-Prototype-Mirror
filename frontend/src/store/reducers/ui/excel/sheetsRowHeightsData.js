import { createReducer } from "store/tools/setup";

const getTopOffsets = (rowHeights) => {
  const rowHeightsLength = rowHeights.length;

  let topOffsetsTotal = 0;
  let topOffsets = [ 0 ];

  for(let row = 1; row < rowHeightsLength; row++) {
    topOffsetsTotal += rowHeights[ row - 1 ];
    topOffsets.push(topOffsetsTotal);
  }

  return topOffsets;
};

const UPDATE_SHEETS_ROW_HEIGHTS_DATA = (state, { sheetsRowHeights }) => {
  let sheetsRowHeightsData = {};

  for(let sheetName in sheetsRowHeights) {
    const rowHeights = sheetsRowHeights[sheetName];

    const topOffsets = getTopOffsets(rowHeights);

    sheetsRowHeightsData[sheetName] = { rowHeights, topOffsets };
  }

  return { ...state, ...sheetsRowHeightsData };
};

const RESET_SHEETS_ROW_HEIGHTS_DATA = () => ({});
const UPDATE_SHEET_ROW_HEIGHTS_DATA = (state, { sheetName, rowHeights }) => ({
  ...state,
  [sheetName]: {
    rowHeights,
    topOffsets: getTopOffsets(rowHeights)
  }
});

const RESET_SHEET_ROW_HEIGHTS_DATA = (state, { sheetName }) => ({
  ...state,
  [sheetName]: {}
});

const sheetsRowHeightsDataReducer = createReducer({}, { 
  UPDATE_SHEETS_ROW_HEIGHTS_DATA, 
  RESET_SHEETS_ROW_HEIGHTS_DATA, 
  UPDATE_SHEET_ROW_HEIGHTS_DATA,
  RESET_SHEET_ROW_HEIGHTS_DATA
});

export default sheetsRowHeightsDataReducer;
