import { UPDATE_COLUMN_WIDTHS, RESET_COLUMN_WIDTHS } from "actionCreators";

export const updateColumnWidths = (columnWidths) => ({ type: UPDATE_COLUMN_WIDTHS, columnWidths });

export const resetColumnWidths = () => ({ type: RESET_COLUMN_WIDTHS });