import { createReducer } from "store/tools/setup";

const defaultSelectionMode = false;

const setSelectionModeOn = () => true;

const setSelectionModeOff = () => false;

const isSelectionMode = createReducer(defaultSelectionMode, { SET_SELECTION_MODE_ON: setSelectionModeOn, SET_SELECTION_MODE_OFF: setSelectionModeOff });

export default isSelectionMode;