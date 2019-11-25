import { UPDATE_SHEETS_FREEZE_COLUMN_COUNT, RESET_SHEETS_FREEZE_COLUMN_COUNT, UPDATE_SHEET_FREEZE_COLUMN_COUNT, RESET_SHEET_FREEZE_COLUMN_COUNT } from "actionCreators";

export const updateSheetsFreezeColumnCount = (sheetsFreezeColumnCount) =>  ({ type: UPDATE_SHEETS_FREEZE_COLUMN_COUNT, sheetsFreezeColumnCount });
export const resetSheetsFreezeColumnCount = () => ({ type: RESET_SHEETS_FREEZE_COLUMN_COUNT });

export const updateSheetFreezeColumnCount = (sheetName, sheetFreezeColumnCount) => ({ type: UPDATE_SHEET_FREEZE_COLUMN_COUNT, sheetName, sheetFreezeColumnCount });
export const resetSheetFreezeColumnCount = (sheetName) => ({ type: RESET_SHEET_FREEZE_COLUMN_COUNT, sheetName });