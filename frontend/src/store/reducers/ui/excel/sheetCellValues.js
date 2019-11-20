import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_CELL_VALUES } from "constants/excel";

const updateSheetCellValues = (_state, { sheetCellValues }) => [ ...sheetCellValues ];

const resetSheetCellValues = () => DEFAULT_EXCEL_SHEET_CELL_VALUES;

const sheetCellValuesReducer = createReducer(DEFAULT_EXCEL_SHEET_CELL_VALUES, { UPDATE_SHEET_CELL_VALUES: updateSheetCellValues, RESET_SHEET_CELL_VALUES: resetSheetCellValues });

export default sheetCellValuesReducer;