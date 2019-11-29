import { createReducer } from "store/tools/setup";

const defaultEditMode = false;

const SET_EDIT_MODE_ON = () => true;

const SET_EDIT_MODE_OFF = () => false;

const isEditMode = createReducer(defaultEditMode, { SET_EDIT_MODE_ON, SET_EDIT_MODE_OFF });

export default isEditMode;