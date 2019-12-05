import { 
  UPDATE_SHEETS_HIDDEN_COLUMNS, 
  RESET_SHEETS_HIDDEN_COLUMNS, 
  UPDATE_SHEET_HIDDEN_COLUMNS, 
  RESET_SHEET_HIDDEN_COLUMNS 
} from "actionCreators";

export const updateSheetsHiddenColumns = (sheetsHiddenColumns) =>  ({ type: UPDATE_SHEETS_HIDDEN_COLUMNS, sheetsHiddenColumns });
export const resetSheetsHiddenColumns = () => ({ type: RESET_SHEETS_HIDDEN_COLUMNS });

export const updateSheetHiddenColumns = (sheetName, sheetHiddenColumns) => ({ type: UPDATE_SHEET_HIDDEN_COLUMNS, sheetName, sheetHiddenColumns });
export const resetSheetHiddenColumns = (sheetName) => ({ type: RESET_SHEET_HIDDEN_COLUMNS, sheetName });
