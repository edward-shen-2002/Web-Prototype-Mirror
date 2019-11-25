import { UPDATE_SHEET_CELL_DATA, RESET_SHEET_CELL_DATA } from "actionCreators";

export const updateSheetCellData = (sheetCellData) => ({ type: UPDATE_SHEET_CELL_DATA, sheetCellData });

export const resetSheetCellData = () => ({ type: RESET_SHEET_CELL_DATA });