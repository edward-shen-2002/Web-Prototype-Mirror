import { UPDATE_SHEET_CELL_VALUES, RESET_SHEET_CELL_VALUES } from "actionCreators";

export const updateSheetCellValues = (sheetCellValues) => ({ type: UPDATE_SHEET_CELL_VALUES, sheetCellValues });

export const resetSheetCellValues = () => ({ type: RESET_SHEET_CELL_VALUES });