import { createReducer } from "store/tools/setup";

const SET_HEADER_DRAG_MODE_ON = () => true;

const SET_HEADER_DRAG_MODE_OFF = () => false;

const isHeaderDragModeReducer = createReducer(false, { SET_HEADER_DRAG_MODE_ON, SET_HEADER_DRAG_MODE_OFF });

export default isHeaderDragModeReducer;