import { UPDATE_SHEETS_ROW_COUNT, RESET_SHEETS_ROW_COUNT, UPDATE_SHEET_ROW_COUNT, RESET_SHEET_ROW_COUNT } from "actionCreators";

export const updateSheetsRowCount = (sheetsRowCount) =>  ({ type: UPDATE_SHEETS_ROW_COUNT, sheetsRowCount });
export const resetSheetsRowCount = () => ({ type: RESET_SHEETS_ROW_COUNT });

export const updateSheetRowCount = (sheetName, sheetRowCount) => ({ type: UPDATE_SHEET_ROW_COUNT, sheetName, sheetRowCount });
export const resetSheetRowCount = (sheetName) => ({ type: RESET_SHEET_ROW_COUNT, sheetName });