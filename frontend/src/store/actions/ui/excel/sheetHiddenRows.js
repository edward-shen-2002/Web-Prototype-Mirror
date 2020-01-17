import { UPDATE_SHEET_HIDDEN_ROWS, RESET_SHEET_HIDDEN_ROWS } from "@actionCreators";

export const updateSheetHiddenRows = (sheetHiddenRows) => ({ type: UPDATE_SHEET_HIDDEN_ROWS, sheetHiddenRows });
export const resetSheetHiddenRows = () => ({ type: RESET_SHEET_HIDDEN_ROWS });
