import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_COLUMNS } from "constants/excel";

const updateColumnCount = (_state, { columnCount }) => columnCount;

const resetColumnCount = () => DEFAULT_EXCEL_COLUMNS;

const columnCountReducer = createReducer(DEFAULT_EXCEL_COLUMNS, { UPDATE_COLUMN_COUNT: updateColumnCount, RESET_COLUMN_COUNT: resetColumnCount });

export default columnCountReducer;