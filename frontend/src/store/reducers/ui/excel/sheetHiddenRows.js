import { createReducer } from "@store/tools/setup";

const UPDATE_SHEET_HIDDEN_ROWS = (_state, { sheetHiddenRows }) => sheetHiddenRows;

const RESET_SHEET_HIDDEN_ROWS = () => ({});

const sheetHiddenRowsReducer = createReducer({}, { 
  UPDATE_SHEET_HIDDEN_ROWS,
  RESET_SHEET_HIDDEN_ROWS
});

export default sheetHiddenRowsReducer;
