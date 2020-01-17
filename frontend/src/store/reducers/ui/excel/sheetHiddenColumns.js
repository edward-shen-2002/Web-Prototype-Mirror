import { createReducer } from "@store/tools/setup";

const UPDATE_SHEET_HIDDEN_COLUMNS = (_state, { sheetHiddenColumns }) => sheetHiddenColumns;

const RESET_SHEET_HIDDEN_COLUMNS = () => ({});

const sheetHiddenColumnsReducer = createReducer({}, { 
  UPDATE_SHEET_HIDDEN_COLUMNS,
  RESET_SHEET_HIDDEN_COLUMNS
});

export default sheetHiddenColumnsReducer;
