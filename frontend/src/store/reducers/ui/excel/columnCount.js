import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_COLUMNS } from "constants/excel";

const updateColumnCount = (_state, { columnCount }) => columnCount;

const resetColumnCount = () => DEFAULT_EXCEL_COLUMNS;

const columnCountReducer = createReducer(DEFAULT_EXCEL_COLUMNS, { UPDATE_COLUMNCOUNT: updateColumnCount, RESET_COLUMNCOUNT: resetColumnCount });

export default columnCountReducer;