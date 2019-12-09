import { UPDATE_COLUMN_RESIZE_DATA, RESET_COLUMN_RESIZE_DATA } from "actionCreators";  

export const updateColumnResizeData = (columnResizeData) => ({ type: UPDATE_COLUMN_RESIZE_DATA, columnResizeData });
export const resetColumnResizeData = () => ({ type: RESET_COLUMN_RESIZE_DATA });
