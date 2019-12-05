import { createReducer } from "store/tools/setup";

const UPDATE_SHEETS_COLUMN_WIDTHS = (state, { sheetsColumnWidths }) => ({ ...state, ...sheetsColumnWidths });

const RESET_SHEETS_COLUMN_WIDTHS = () => ({});
const UPDATE_SHEET_COLUMN_WIDTHS = (state, { sheetName, columnWidths }) => ({
  ...state,
  [sheetName]: columnWidths
});

const RESET_SHEET_COLUMN_WIDTHS = (state, { sheetName }) => ({
  ...state,
  [sheetName]: {}
});

const sheetsColumnWidthsReducer = createReducer({}, { 
  UPDATE_SHEETS_COLUMN_WIDTHS, 
  RESET_SHEETS_COLUMN_WIDTHS, 
  UPDATE_SHEET_COLUMN_WIDTHS,
  RESET_SHEET_COLUMN_WIDTHS
});

export default sheetsColumnWidthsReducer;
