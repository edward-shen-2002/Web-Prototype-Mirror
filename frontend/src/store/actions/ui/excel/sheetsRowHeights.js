import { UPDATE_SHEETS_ROW_HEIGHTS, RESET_SHEETS_ROW_HEIGHTS, UPDATE_SHEET_ROW_HEIGHTS, RESET_SHEET_ROW_HEIGHTS } from "actionCreators";

export const updateSheetsRowHeights = (sheetsRowHeights) =>  ({ type: UPDATE_SHEETS_ROW_HEIGHTS, sheetsRowHeights });
export const resetSheetsRowHeights = () => ({ type: RESET_SHEETS_ROW_HEIGHTS });

export const updateSheetRowHeights = (sheetName, sheetRowHeights) => ({ type: UPDATE_SHEET_ROW_HEIGHTS, sheetName, sheetRowHeights });
export const resetSheetRowHeights = (sheetName) => ({ type: RESET_SHEET_ROW_HEIGHTS, sheetName });