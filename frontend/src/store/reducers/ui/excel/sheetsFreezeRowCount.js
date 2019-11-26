import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_FREEZE_ROW_COUNT } from "constants/excel";

const UPDATE_SHEETS_FREEZE_ROW_COUNT = (state, { sheetsFreezeRowCount }) => ({ ...state, ...sheetsFreezeRowCount });

const RESET_SHEETS_FREEZE_ROW_COUNT = () => ({});

const UPDATE_SHEET_FREEZE_ROW_COUNT = (state, { sheetName, sheetFreezeRowCount }) => ({
  ...state,
  [sheetName]: sheetFreezeRowCount
});

const RESET_SHEET_FREEZE_ROW_COUNT = (state, { sheetName }) => ({
  ...state,
  [sheetName]: DEFAULT_EXCEL_SHEET_FREEZE_ROW_COUNT
});

const sheetsfREEZERowCount = createReducer({}, { 
  UPDATE_SHEETS_FREEZE_ROW_COUNT, 
  RESET_SHEETS_FREEZE_ROW_COUNT, 
  UPDATE_SHEET_FREEZE_ROW_COUNT,
  RESET_SHEET_FREEZE_ROW_COUNT
});

export default sheetsfREEZERowCount;
