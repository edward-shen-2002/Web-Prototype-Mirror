import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_COLUMN_COUNT } from "constants/excel";

const UPDATE_SHEET_COLUMN_COUNT = (_state, { sheetColumnCount }) => sheetColumnCount;

const RESET_SHEET_COLUMN_COUNT = () => DEFAULT_EXCEL_SHEET_COLUMN_COUNT;

const sheetColumnCount = createReducer({}, { 
  UPDATE_SHEET_COLUMN_COUNT,
  RESET_SHEET_COLUMN_COUNT
});

export default sheetColumnCount;
