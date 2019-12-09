import { UPDATE_SHEET_FREEZE_ROW_COUNT, RESET_SHEET_FREEZE_ROW_COUNT } from "actionCreators";

export const updateSheetFreezeRowCount = (sheetFreezeRowCount) => ({ type: UPDATE_SHEET_FREEZE_ROW_COUNT, sheetFreezeRowCount });
export const resetSheetFreezeRowCount = () => ({ type: RESET_SHEET_FREEZE_ROW_COUNT });