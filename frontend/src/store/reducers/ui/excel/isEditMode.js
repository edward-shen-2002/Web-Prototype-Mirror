import { createReducer } from "store/tools/setup";

const defaultEditMode = false;

const setEditModeOn = () => true;

const setEditModeOff = () => false;

const isEditMode = createReducer(defaultEditMode, { SET_EDITMODE_ON: setEditModeOn, SET_EDITMODE_OFF: setEditModeOff });

export default isEditMode;