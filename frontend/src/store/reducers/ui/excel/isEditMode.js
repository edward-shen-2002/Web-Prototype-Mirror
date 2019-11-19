import { createReducer } from "store/tools/setup";

const defaultEditMode = false;

const setEditModeOn = () => true;

const setEditModeOff = () => false;

const isEditMode = createReducer(defaultEditMode, { SET_EDIT_MODE_ON: setEditModeOn, SET_EDIT_MODE_OFF: setEditModeOff });

export default isEditMode;