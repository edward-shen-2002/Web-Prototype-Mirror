import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_FREEZE_COLUMN_COUNT } from "constants/excel";

const UPDATE_SHEETS_FREEZE_COLUMN_COUNT = (state, { sheetsFreezeColumnCount }) => ({ ...state, ...sheetsFreezeColumnCount });

const RESET_SHEETS_FREEZE_COLUMN_COUNT = () => ({});

const UPDATE_SHEET_FREEZE_COLUMN_COUNT = (state, { sheetName, sheetFreezeColumnCount }) => ({
  ...state,
  [sheetName]: sheetFreezeColumnCount
});

const RESET_SHEET_FREEZE_COLUMN_COUNT = (state, { sheetName }) => ({
  ...state,
  [sheetName]: DEFAULT_EXCEL_SHEET_FREEZE_COLUMN_COUNT
});

const sheetsfREEZEColumnCount = createReducer({}, { 
  UPDATE_SHEETS_FREEZE_COLUMN_COUNT, 
  RESET_SHEETS_FREEZE_COLUMN_COUNT, 
  UPDATE_SHEET_FREEZE_COLUMN_COUNT,
  RESET_SHEET_FREEZE_COLUMN_COUNT
});

export default sheetsfREEZEColumnCount;
