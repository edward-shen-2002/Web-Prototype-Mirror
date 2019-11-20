import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_SHEET_NAME } from "constants/excel";

const updateActiveSheetName = (_state, { activeSheetName }) => activeSheetName;

const resetActiveSheetName = () => DEFAULT_EXCEL_ACTIVE_SHEET_NAME;

const activeSheetNameReducer = createReducer(DEFAULT_EXCEL_ACTIVE_SHEET_NAME, { UPDATE_ACTIVE_SHEET_NAME: updateActiveSheetName, RESET_ACTIVE_SHEET_NAME: resetActiveSheetName });

export default activeSheetNameReducer;