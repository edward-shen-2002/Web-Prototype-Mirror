import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_FREEZE_COLUMN_COUNT } from "constants/excel";

const updateFreezeColumnCount = (_state, { freezeColumnCount }) => freezeColumnCount;

const resetFreezeColumnCount = () => DEFAULT_EXCEL_FREEZE_COLUMN_COUNT;

const freezeColumnCountReducer = createReducer(DEFAULT_EXCEL_FREEZE_COLUMN_COUNT, { UPDATE_FREEZE_COLUMN_COUNT: updateFreezeColumnCount, RESET_FREEZE_COLUMN_COUNT: resetFreezeColumnCount });

export default freezeColumnCountReducer;