import { UPDATE_SHEETS_COLUMN_COUNT, RESET_SHEETS_COLUMN_COUNT, UPDATE_SHEET_COLUMN_COUNT, RESET_SHEET_COLUMN_COUNT } from "actionCreators";

export const updateSheetsColumnCount = (sheetsColumnCount) =>  ({ type: UPDATE_SHEETS_COLUMN_COUNT, sheetsColumnCount });
export const resetSheetsColumnCount = () => ({ type: RESET_SHEETS_COLUMN_COUNT });

export const updateSheetColumnCount = (sheetName, columnCount) => ({ type: UPDATE_SHEET_COLUMN_COUNT, sheetName, columnCount });
export const resetSheetColumnCount = (sheetName) => ({ type: RESET_SHEET_COLUMN_COUNT, sheetName });