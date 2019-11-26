import { createReducer } from "store/tools/setup";

const UPDATE_SHEETS_CELL_DATA = (state, { sheetsCellData }) => ({ ...state, ...sheetsCellData });

const RESET_SHEETS_CELL_DATA = () => ({});

const UPDATE_SHEET_CELL_DATA = (state, { sheetName, sheetCellData }) => ({
  ...state,
  [sheetName]: [ ...sheetCellData ]
});

const RESET_SHEET_CELL_DATA = (state, { sheetName }) => ({
  ...state,
  [sheetName]: []
});

const sheetsCellData = createReducer({}, { 
  UPDATE_SHEETS_CELL_DATA, 
  RESET_SHEETS_CELL_DATA, 
  UPDATE_SHEET_CELL_DATA,
  RESET_SHEET_CELL_DATA
});

export default sheetsCellData;
