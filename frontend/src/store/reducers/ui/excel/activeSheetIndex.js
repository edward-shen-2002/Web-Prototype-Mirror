import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_SHEET_INDEX } from "constants/excel";

const updateActiveSheetIndex = (_state, { activeSheetIndex }) => activeSheetIndex;

const resetActiveSheetIndex = () => DEFAULT_EXCEL_ACTIVE_SHEET_INDEX;

const activeSheetIndexReducer = createReducer(DEFAULT_EXCEL_ACTIVE_SHEET_INDEX, { UPDATE_ACTIVESHEETINDEX: updateActiveSheetIndex, RESET_ACTIVESHEETINDEX: resetActiveSheetIndex });

export default activeSheetIndexReducer;