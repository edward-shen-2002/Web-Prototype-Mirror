import { UPDATE_SHEETS_FREEZE_ROW_COUNT, RESET_SHEETS_FREEZE_ROW_COUNT, UPDATE_SHEET_FREEZE_ROW_COUNT, RESET_SHEET_FREEZE_ROW_COUNT } from "actionCreators";

export const updateSheetsFreezeRowCount = (sheetsFreezeRowCount) =>  ({ type: UPDATE_SHEETS_FREEZE_ROW_COUNT, sheetsFreezeRowCount });
export const resetSheetsFreezeRowCount = () => ({ type: RESET_SHEETS_FREEZE_ROW_COUNT });

export const updateSheetFreezeRowCount = (sheetName, sheetFreezeRowCount) => ({ type: UPDATE_SHEET_FREEZE_ROW_COUNT, sheetName, sheetFreezeRowCount });
export const resetSheetFreezeRowCount = (sheetName) => ({ type: RESET_SHEET_FREEZE_ROW_COUNT, sheetName });