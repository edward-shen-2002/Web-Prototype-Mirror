import { createReducer } from "store/tools/setup";

const UPDATE_SHEET_ROW_HEIGHTS = (_state, { sheetRowHeights }) => sheetRowHeights;

const RESET_SHEET_ROW_HEIGHTS = () => ({});

const sheetRowHeightsReducer = createReducer({}, { 
  UPDATE_SHEET_ROW_HEIGHTS,
  RESET_SHEET_ROW_HEIGHTS
});

export default sheetRowHeightsReducer;
