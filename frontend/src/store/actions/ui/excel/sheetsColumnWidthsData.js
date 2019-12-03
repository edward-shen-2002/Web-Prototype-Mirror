import { 
  UPDATE_SHEETS_COLUMN_WIDTHS_DATA, 
  RESET_SHEETS_COLUMN_WIDTHS_DATA, 
  UPDATE_SHEET_COLUMN_WIDTHS_DATA, 
  RESET_SHEET_COLUMN_WIDTHS_DATA 
} from "actionCreators";

export const updateSheetsColumnWidthsData = (sheetsColumnWidths) =>  ({ type: UPDATE_SHEETS_COLUMN_WIDTHS_DATA, sheetsColumnWidths });
export const resetSheetsColumnWidthsData = () => ({ type: RESET_SHEETS_COLUMN_WIDTHS_DATA });
export const updateSheetColumnWidthsData = (sheetName, columnWidths) => ({ type: UPDATE_SHEET_COLUMN_WIDTHS_DATA, sheetName, columnWidths });
export const resetSheetColumnWidthsData = (sheetName) => ({ type: RESET_SHEET_COLUMN_WIDTHS_DATA, sheetName });