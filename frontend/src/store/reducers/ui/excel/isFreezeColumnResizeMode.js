import { createReducer } from "store/tools/setup";

const SET_FREEZE_COLUMN_RESIZE_MODE_ON = () => true;

const SET_FREEZE_COLUMN_RESIZE_MODE_OFF = () => false;

const isFreezeColumnResizeModeReducer = createReducer(false, { SET_FREEZE_COLUMN_RESIZE_MODE_ON, SET_FREEZE_COLUMN_RESIZE_MODE_OFF });

export default isFreezeColumnResizeModeReducer;