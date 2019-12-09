import { UPDATE_ROW_RESIZE_DATA, RESET_ROW_RESIZE_DATA } from "actionCreators";  

export const updateRowResizeData = (rowResizeData) => ({ type: UPDATE_ROW_RESIZE_DATA, rowResizeData });
export const resetRowResizeData = () => ({ type: RESET_ROW_RESIZE_DATA });
