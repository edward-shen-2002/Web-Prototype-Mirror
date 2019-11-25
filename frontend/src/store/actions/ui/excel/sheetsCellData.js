import { UPDATE_SHEETS_CELL_DATA, RESET_SHEETS_CELL_DATA, UPDATE_SHEET_CELL_DATA, RESET_SHEET_CELL_DATA } from "actionCreators";

export const updateSheetsCellData = (sheetsCellData) =>  ({ type: UPDATE_SHEETS_CELL_DATA, sheetsCellData });
export const resetSheetsCellData = () => ({ type: RESET_SHEETS_CELL_DATA });


// TODO
export const updateSheetCellData = (sheetName, sheetCellData) => ({ type: UPDATE_SHEET_CELL_DATA, sheetName, sheetCellData });
export const resetSheetCellData = (sheetName) => ({ type: RESET_SHEET_CELL_DATA, sheetName });