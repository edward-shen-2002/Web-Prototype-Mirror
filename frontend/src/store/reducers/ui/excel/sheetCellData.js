import { createReducer } from "store/tools/setup";

const UPDATE_SHEET_CELL_DATA = (_state, { sheetCellData }) => ({ ...sheetCellData });

const RESET_SHEET_CELL_DATA = () => ({});

const sheetCellData = createReducer({}, { 
  UPDATE_SHEET_CELL_DATA,
  RESET_SHEET_CELL_DATA
});

export default sheetCellData;
