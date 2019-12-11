import { createReducer } from "store/tools/setup";

const SET_FREEZE_ROW_RESIZE_MODE_ON = () => true;

const SET_FREEZE_ROW_RESIZE_MODE_OFF = () => false;

const isFreezeRowResizeModeReducer = createReducer(false, { SET_FREEZE_ROW_RESIZE_MODE_ON, SET_FREEZE_ROW_RESIZE_MODE_OFF });

export default isFreezeRowResizeModeReducer;