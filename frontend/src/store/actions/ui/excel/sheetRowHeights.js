import { UPDATE_SHEET_ROW_HEIGHTS, RESET_SHEET_ROW_HEIGHTS } from "@actionCreators";

export const updateSheetRowHeights = (sheetRowHeights) => ({ type: UPDATE_SHEET_ROW_HEIGHTS, sheetRowHeights });
export const resetSheetRowHeights = () => ({ type: RESET_SHEET_ROW_HEIGHTS });