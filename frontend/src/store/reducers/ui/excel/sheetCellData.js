import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_CELL_DATA } from "constants/excel";

const updateSheetCellData = (_state, { sheetCellData }) => [ ...sheetCellData ];

const resetSheetCellData = () => DEFAULT_EXCEL_SHEET_CELL_DATA;

const sheetCellDataReducer = createReducer(DEFAULT_EXCEL_SHEET_CELL_DATA, { UPDATE_SHEET_CELL_DATA: updateSheetCellData, RESET_SHEET_CELL_DATA: resetSheetCellData });

export default sheetCellDataReducer;
