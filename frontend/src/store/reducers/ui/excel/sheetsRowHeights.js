import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_ROW_HEIGHTS } from "constants/excel";

const UPDATE_SHEETS_ROW_HEIGHTS = (state, { sheetsRowHeights }) => ({ ...state, ...sheetsRowHeights });

const RESET_SHEETS_ROW_HEIGHTS = () => ({});

const UPDATE_SHEET_ROW_HEIGHTS = (state, { sheetName, sheetRowHeights }) => ({
  ...state,
  [sheetName]: sheetRowHeights
});

const RESET_SHEET_ROW_HEIGHTS = (state, { sheetName }) => ({
  ...state,
  [sheetName]: DEFAULT_EXCEL_SHEET_ROW_HEIGHTS
});

const sheetsRowHeights = createReducer({}, { 
  UPDATE_SHEETS_ROW_HEIGHTS, 
  RESET_SHEETS_ROW_HEIGHTS, 
  UPDATE_SHEET_ROW_HEIGHTS,
  RESET_SHEET_ROW_HEIGHTS
});

export default sheetsRowHeights;
