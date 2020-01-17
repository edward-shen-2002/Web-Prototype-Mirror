import { UPDATE_SHEETS_ROW_COUNT, RESET_SHEETS_ROW_COUNT, UPDATE_SHEET_ROW_COUNT, RESET_SHEET_ROW_COUNT } from "@actionCreators";

export const updateSheetRowCount = (sheetRowCount) => ({ type: UPDATE_SHEET_ROW_COUNT, sheetRowCount });
export const resetSheetRowCount = () => ({ type: RESET_SHEET_ROW_COUNT });