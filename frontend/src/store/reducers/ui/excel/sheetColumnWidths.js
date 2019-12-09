import { createReducer } from "store/tools/setup";

const UPDATE_SHEET_COLUMN_WIDTHS = (_state, { sheetColumnWidths }) => sheetColumnWidths;

const RESET_SHEET_COLUMN_WIDTHS = () => ({});

const sheetsColumnWidthsReducer = createReducer({}, { 
  UPDATE_SHEET_COLUMN_WIDTHS,
  RESET_SHEET_COLUMN_WIDTHS
});

export default sheetsColumnWidthsReducer;
