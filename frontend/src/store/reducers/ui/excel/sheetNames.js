import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_NAMES } from "constants/excel";

const updateSheetNames = (_state, { sheetNames }) => [ ...sheetNames ];

const resetSheetNames = () => DEFAULT_EXCEL_SHEET_NAMES;

const sheetNamesReducer = createReducer(DEFAULT_EXCEL_SHEET_NAMES, { UPDATE_SHEET_NAMES: updateSheetNames, RESET_SHEET_NAMES: resetSheetNames });

export default sheetNamesReducer;