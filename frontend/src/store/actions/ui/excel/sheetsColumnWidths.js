import { UPDATE_SHEETS_COLUMN_WIDTHS, RESET_SHEETS_COLUMN_WIDTHS, UPDATE_SHEET_COLUMN_WIDTHS, RESET_SHEET_COLUMN_WIDTHS } from "actionCreators";

export const updateSheetsColumnWidths = (sheetsColumnWidths) =>  ({ type: UPDATE_SHEETS_COLUMN_WIDTHS, sheetsColumnWidths });
export const resetSheetsColumnWidths = () => ({ type: RESET_SHEETS_COLUMN_WIDTHS });


export const updateSheetColumnWidths = (sheetName, sheetColumnWidths) => ({ type: UPDATE_SHEET_COLUMN_WIDTHS, sheetName, sheetColumnWidths });
export const resetSheetColumnWidths = (sheetName) => ({ type: RESET_SHEET_COLUMN_WIDTHS, sheetName });