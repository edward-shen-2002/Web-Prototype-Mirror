import { UPDATE_COLUMN_COUNT, RESET_COLUMN_COUNT } from "actionCreators";

export const updateColumnCount = (columnCount) => ({ type: UPDATE_COLUMN_COUNT, columnCount });

export const resetColumnCount = () => ({ type: RESET_COLUMN_COUNT });