import { UPDATE_SHEET_COLUMN_COUNT, RESET_SHEET_COLUMN_COUNT } from "actionCreators";

export const updateSheetColumnCount = (sheetColumnCount) => ({ type: UPDATE_SHEET_COLUMN_COUNT, sheetColumnCount });
export const resetSheetColumnCount = () => ({ type: RESET_SHEET_COLUMN_COUNT });