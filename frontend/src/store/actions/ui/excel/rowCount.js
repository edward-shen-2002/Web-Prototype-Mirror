import { UPDATE_ROW_COUNT, RESET_ROW_COUNT } from "actionCreators";

export const updateRowCount = (rowCount) => ({ type: UPDATE_ROW_COUNT, rowCount });

export const resetRowCount = () => ({ type: RESET_ROW_COUNT });