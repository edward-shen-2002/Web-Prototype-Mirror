import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_FREEZE_ROW_COUNT } from "constants/excel";

const updateFreezeRowCount = (_state, { freezeRowCount }) => freezeRowCount;

const resetFreezeRowCount = () => DEFAULT_EXCEL_FREEZE_ROW_COUNT;

const freezeRowCountReducer = createReducer(DEFAULT_EXCEL_FREEZE_ROW_COUNT, { UPDATE_FREEZEROWCOUNT: updateFreezeRowCount, RESET_FREEZEROWCOUNT: resetFreezeRowCount });

export default freezeRowCountReducer;