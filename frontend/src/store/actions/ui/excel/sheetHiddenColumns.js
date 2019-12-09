import { UPDATE_SHEET_HIDDEN_COLUMNS, RESET_SHEET_HIDDEN_COLUMNS } from "actionCreators";

export const updateSheetHiddenColumns = (sheetHiddenColumns) => ({ type: UPDATE_SHEET_HIDDEN_COLUMNS, sheetHiddenColumns });
export const resetSheetHiddenColumns = () => ({ type: RESET_SHEET_HIDDEN_COLUMNS });
