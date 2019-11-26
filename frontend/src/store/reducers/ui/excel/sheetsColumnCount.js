import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_COLUMN_COUNT } from "constants/excel";

const UPDATE_SHEETS_COLUMN_COUNT = (state, { sheetsColumnCount }) => ({ ...state, ...sheetsColumnCount });

const RESET_SHEETS_COLUMN_COUNT = () => ({});

const UPDATE_SHEET_COLUMN_COUNT = (state, { sheetName, sheetColumnCount }) => ({
  ...state,
  [sheetName]: sheetColumnCount
});

const RESET_SHEET_COLUMN_COUNT = (state, { sheetName }) => ({
  ...state,
  [sheetName]: DEFAULT_EXCEL_SHEET_COLUMN_COUNT
});

const sheetsColumnCount = createReducer({}, { 
  UPDATE_SHEETS_COLUMN_COUNT, 
  RESET_SHEETS_COLUMN_COUNT, 
  UPDATE_SHEET_COLUMN_COUNT,
  RESET_SHEET_COLUMN_COUNT
});

export default sheetsColumnCount;
