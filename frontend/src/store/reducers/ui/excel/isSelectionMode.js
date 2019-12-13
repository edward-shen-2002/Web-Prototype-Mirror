import { createReducer } from "store/tools/setup";

const defaultSelectionMode = false;

const SET_SELECTION_MODE_ON = () => true;

const SET_SELECTION_MODE_OFF = () => false;

const isSelectionMode = createReducer(defaultSelectionMode, { SET_SELECTION_MODE_ON, SET_SELECTION_MODE_OFF });

export default isSelectionMode;