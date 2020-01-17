import { UPDATE_SHEET_COLUMN_WIDTHS, RESET_SHEET_COLUMN_WIDTHS } from "@actionCreators";

export const updateSheetColumnWidths = (sheetColumnWidths) => ({ type: UPDATE_SHEET_COLUMN_WIDTHS, sheetColumnWidths });
export const resetSheetColumnWidths = () => ({ type: RESET_SHEET_COLUMN_WIDTHS });