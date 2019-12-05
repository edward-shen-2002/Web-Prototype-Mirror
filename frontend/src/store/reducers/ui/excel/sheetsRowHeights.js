import { createReducer } from "store/tools/setup";

const UPDATE_SHEETS_ROW_HEIGHTS = (state, { sheetsRowHeights }) => ({ ...state, ...sheetsRowHeights });

const RESET_SHEETS_ROW_HEIGHTS = () => ({});
const UPDATE_SHEET_ROW_HEIGHTS = (state, { sheetName, rowHeights }) => ({
  ...state,
  [sheetName]: rowHeights
});

const RESET_SHEET_ROW_HEIGHTS = (state, { sheetName }) => ({
  ...state,
  [sheetName]: {}
});

const sheetsRowHeightsReducer = createReducer({}, { 
  UPDATE_SHEETS_ROW_HEIGHTS, 
  RESET_SHEETS_ROW_HEIGHTS, 
  UPDATE_SHEET_ROW_HEIGHTS,
  RESET_SHEET_ROW_HEIGHTS
});

export default sheetsRowHeightsReducer;
