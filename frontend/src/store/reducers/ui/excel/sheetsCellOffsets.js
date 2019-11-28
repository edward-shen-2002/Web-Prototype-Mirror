import { createReducer } from "store/tools/setup";

const UPDATE_SHEETS_CELL_OFFSETS = (state, { sheetsCellOffsets }) => ({ ...state, ...sheetsCellOffsets });

const RESET_SHEETS_CELL_OFFSETS = () => ({});

const UPDATE_SHEET_CELL_OFFSETS = (state, { sheetName, sheetCellOffsets }) => ({
  ...state,
  [sheetName]: [ ...sheetCellOffsets ]
});

const RESET_SHEET_CELL_OFFSETS = (state, { sheetName }) => ({
  ...state,
  [sheetName]: []
});

const sheetsCellOffsets = createReducer({}, { 
  UPDATE_SHEETS_CELL_OFFSETS, 
  RESET_SHEETS_CELL_OFFSETS, 
  UPDATE_SHEET_CELL_OFFSETS,
  RESET_SHEET_CELL_OFFSETS
});

export default sheetsCellOffsets;
