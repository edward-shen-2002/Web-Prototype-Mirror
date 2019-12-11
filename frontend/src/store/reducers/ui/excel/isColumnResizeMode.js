import { createReducer } from "store/tools/setup";

const SET_COLUMN_RESIZE_MODE_ON = () => true;

const SET_COLUMN_RESIZE_MODE_OFF = () => false;

const isColumnResizeModeReducer = createReducer(false, { SET_COLUMN_RESIZE_MODE_ON, SET_COLUMN_RESIZE_MODE_OFF });

export default isColumnResizeModeReducer;