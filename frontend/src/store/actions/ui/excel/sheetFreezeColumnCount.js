import { UPDATE_SHEET_FREEZE_COLUMN_COUNT, RESET_SHEET_FREEZE_COLUMN_COUNT } from "@actionCreators";

export const updateSheetFreezeColumnCount = (sheetFreezeColumnCount) => ({ type: UPDATE_SHEET_FREEZE_COLUMN_COUNT, sheetFreezeColumnCount });
export const resetSheetFreezeColumnCount = () => ({ type: RESET_SHEET_FREEZE_COLUMN_COUNT });