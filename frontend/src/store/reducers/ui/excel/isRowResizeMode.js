import { createReducer } from "store/tools/setup";

const SET_ROW_RESIZE_MODE_ON = () => true;

const SET_ROW_RESIZE_MODE_OFF = () => false;

const isRowResizeModeReducer = createReducer(false, { SET_ROW_RESIZE_MODE_ON, SET_ROW_RESIZE_MODE_OFF });

export default isRowResizeModeReducer;