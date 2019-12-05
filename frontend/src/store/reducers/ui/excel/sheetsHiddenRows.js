import { createReducer } from "store/tools/setup";

const UPDATE_SHEETS_HIDDEN_ROWS = (state, { sheetsHiddenRows }) => ({ ...state, ...sheetsHiddenRows });

const RESET_SHEETS_HIDDEN_ROWS = () => ({});

const UPDATE_SHEET_HIDDEN_ROWS = (state, { sheetName, sheetHiddenRows }) => ({
  ...state,
  [sheetName]: sheetHiddenRows
});

const RESET_SHEET_HIDDEN_ROWS = (state, { sheetName }) => ({
  ...state,
  [sheetName]: {}
});

const sheetsHiddenRowsReducer = createReducer({}, { 
  UPDATE_SHEETS_HIDDEN_ROWS, 
  RESET_SHEETS_HIDDEN_ROWS, 
  UPDATE_SHEET_HIDDEN_ROWS,
  RESET_SHEET_HIDDEN_ROWS
});

export default sheetsHiddenRowsReducer;
