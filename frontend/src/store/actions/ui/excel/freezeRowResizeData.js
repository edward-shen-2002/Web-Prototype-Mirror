import { UPDATE_FREEZE_ROW_RESIZE_DATA, RESET_FREEZE_ROW_RESIZE_DATA } from "actionCreators";  

export const updateFreezeRowResizeData = (freezeRowResizeData) => ({ type: UPDATE_FREEZE_ROW_RESIZE_DATA, freezeRowResizeData });
export const resetFreezeRowResizeData = () => ({ type: RESET_FREEZE_ROW_RESIZE_DATA });
