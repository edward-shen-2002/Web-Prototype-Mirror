import { 
  UPDATE_SHEETS_HIDDEN_ROWS, 
  RESET_SHEETS_HIDDEN_ROWS, 
  UPDATE_SHEET_HIDDEN_ROWS, 
  RESET_SHEET_HIDDEN_ROWS 
} from "actionCreators";

export const updateSheetsHiddenRows = (sheetsHiddenRows) =>  ({ type: UPDATE_SHEETS_HIDDEN_ROWS, sheetsHiddenRows });
export const resetSheetsHiddenRows = () => ({ type: RESET_SHEETS_HIDDEN_ROWS });

export const updateSheetHiddenRows = (sheetName, sheetHiddenRows) => ({ type: UPDATE_SHEET_HIDDEN_ROWS, sheetName, sheetHiddenRows });
export const resetSheetHiddenRows = (sheetName) => ({ type: RESET_SHEET_HIDDEN_ROWS, sheetName });
