import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_ROW_COUNT } from "constants/excel";

const UPDATE_SHEETS_ROW_COUNT = (state, { sheetsRowCount }) => ({ ...state, ...sheetsRowCount });

const RESET_SHEETS_ROW_COUNT = () => ({});

const UPDATE_SHEET_ROW_COUNT = (state, { sheetName, sheetRowCount }) => ({
  ...state,
  [sheetName]: sheetRowCount
});

const RESET_SHEET_ROW_COUNT = (state, { sheetName }) => ({
  ...state,
  [sheetName]: DEFAULT_EXCEL_SHEET_ROW_COUNT
});

const sheetsRowCount = createReducer({}, { 
  UPDATE_SHEETS_ROW_COUNT, 
  RESET_SHEETS_ROW_COUNT, 
  UPDATE_SHEET_ROW_COUNT,
  RESET_SHEET_ROW_COUNT
});

export default sheetsRowCount;
