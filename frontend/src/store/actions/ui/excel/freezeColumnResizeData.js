import { UPDATE_FREEZE_COLUMN_RESIZE_DATA, RESET_FREEZE_COLUMN_RESIZE_DATA } from "actionCreators";  

export const updateFreezeColumnResizeData = (freezeColumnResizeData) => ({ type: UPDATE_FREEZE_COLUMN_RESIZE_DATA, freezeColumnResizeData });
export const resetFreezeColumnResizeData = () => ({ type: RESET_FREEZE_COLUMN_RESIZE_DATA });
