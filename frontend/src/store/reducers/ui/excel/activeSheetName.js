import { createReducer } from "@store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_SHEET_NAME } from "@constants/excel";

const UPDATE_ACTIVE_SHEET_NAME = (_state, { activeSheetName }) => activeSheetName;

const RESET_ACTIVE_SHEET_NAME = () => DEFAULT_EXCEL_ACTIVE_SHEET_NAME;

const activeSheetNameReducer = createReducer(DEFAULT_EXCEL_ACTIVE_SHEET_NAME, { UPDATE_ACTIVE_SHEET_NAME, RESET_ACTIVE_SHEET_NAME });

export default activeSheetNameReducer;