import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_COLUMN_WIDTHS } from "constants/excel";

const updateColumnWidths = (_state, { columnWidths }) => [ ...columnWidths ];

const resetColumnWidths = () => DEFAULT_EXCEL_COLUMN_WIDTHS;

const columnWidthsReducer = createReducer(DEFAULT_EXCEL_COLUMN_WIDTHS, { UPDATE_COLUMN_WIDTHS: updateColumnWidths, RESET_COLUMN_WIDTHS: resetColumnWidths });

export default columnWidthsReducer;