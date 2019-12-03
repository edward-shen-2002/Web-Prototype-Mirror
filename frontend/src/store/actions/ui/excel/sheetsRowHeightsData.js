import { 
  UPDATE_SHEETS_ROW_HEIGHTS_DATA, 
  RESET_SHEETS_ROW_HEIGHTS_DATA, 
  UPDATE_SHEET_ROW_HEIGHTS_DATA, 
  RESET_SHEET_ROW_HEIGHTS_DATA 
} from "actionCreators";

export const updateSheetsRowHeightsData = (sheetsRowHeights) =>  ({ type: UPDATE_SHEETS_ROW_HEIGHTS_DATA, sheetsRowHeights });
export const resetSheetsRowHeightsData = () => ({ type: RESET_SHEETS_ROW_HEIGHTS_DATA });

export const updateSheetRowHeightsData = (sheetName, sheetRowHeights) => ({ type: UPDATE_SHEET_ROW_HEIGHTS_DATA, sheetName, sheetRowHeights });
export const resetSheetRowHeightsData = (sheetName) => ({ type: RESET_SHEET_ROW_HEIGHTS_DATA, sheetName });