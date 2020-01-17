import { createReducer } from "@store/tools/setup";

import { DEFAULT_EXCEL_SHEET_FREEZE_ROW_COUNT } from "@constants/excel";

const UPDATE_SHEET_FREEZE_ROW_COUNT = (_state, { sheetFreezeRowCount }) => sheetFreezeRowCount;

const RESET_SHEET_FREEZE_ROW_COUNT = () => DEFAULT_EXCEL_SHEET_FREEZE_ROW_COUNT;

const sheetFreezeRowCount = createReducer({}, { 
  UPDATE_SHEET_FREEZE_ROW_COUNT,
  RESET_SHEET_FREEZE_ROW_COUNT
});

export default sheetFreezeRowCount;
