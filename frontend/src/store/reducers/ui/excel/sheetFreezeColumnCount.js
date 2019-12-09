import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_FREEZE_COLUMN_COUNT } from "constants/excel";

const UPDATE_SHEET_FREEZE_COLUMN_COUNT = (_state, { sheetFreezeColumnCount }) => sheetFreezeColumnCount;

const RESET_SHEET_FREEZE_COLUMN_COUNT = () => DEFAULT_EXCEL_SHEET_FREEZE_COLUMN_COUNT;

const sheetFreezeColumnCount = createReducer({}, { 
  UPDATE_SHEET_FREEZE_COLUMN_COUNT,
  RESET_SHEET_FREEZE_COLUMN_COUNT
});

export default sheetFreezeColumnCount;
