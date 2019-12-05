import { createReducer } from "store/tools/setup";

const UPDATE_SHEETS_HIDDEN_COLUMNS = (state, { sheetsHiddenColumns }) => ({ ...state, ...sheetsHiddenColumns });

const RESET_SHEETS_HIDDEN_COLUMNS = () => ({});

const UPDATE_SHEET_HIDDEN_COLUMNS = (state, { sheetName, sheetHiddenColumns }) => ({
  ...state,
  [sheetName]: sheetHiddenColumns
});

const RESET_SHEET_HIDDEN_COLUMNS = (state, { sheetName }) => ({
  ...state,
  [sheetName]: {}
});

const sheetsHiddenColumnsReducer = createReducer({}, { 
  UPDATE_SHEETS_HIDDEN_COLUMNS, 
  RESET_SHEETS_HIDDEN_COLUMNS, 
  UPDATE_SHEET_HIDDEN_COLUMNS,
  RESET_SHEET_HIDDEN_COLUMNS
});

export default sheetsHiddenColumnsReducer;
