import { createReducer } from "@store/tools/setup";

import { DEFAULT_EXCEL_SHEET_ROW_COUNT } from "@constants/excel";

const UPDATE_SHEET_ROW_COUNT = (_state, { sheetRowCount }) => sheetRowCount;

const RESET_SHEET_ROW_COUNT = () => DEFAULT_EXCEL_SHEET_ROW_COUNT;

const sheetRowCount = createReducer({}, { 
  UPDATE_SHEET_ROW_COUNT,
  RESET_SHEET_ROW_COUNT
});

export default sheetRowCount;
