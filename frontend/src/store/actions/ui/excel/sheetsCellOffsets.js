import { UPDATE_SHEETS_CELL_OFFSETS, RESET_SHEETS_CELL_OFFSETS, UPDATE_SHEET_CELL_OFFSETS, RESET_SHEET_CELL_OFFSETS } from "actionCreators";

export const updateSheetsCellOffsets = (sheetsCellOffsets) =>  ({ type: UPDATE_SHEETS_CELL_OFFSETS, sheetsCellOffsets });
export const resetSheetsCellOffsets = () => ({ type: RESET_SHEETS_CELL_OFFSETS });


// TODO
export const updateSheetCellOffsets = (sheetName, sheetCellOffsets) => ({ type: UPDATE_SHEET_CELL_OFFSETS, sheetName, sheetCellOffsets });
export const resetSheetCellOffsets = (sheetName) => ({ type: RESET_SHEET_CELL_OFFSETS, sheetName });