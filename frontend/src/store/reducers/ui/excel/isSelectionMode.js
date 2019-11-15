import { createReducer } from "store/tools/setup";

const defaultSelectionMode = false;

const setSelectionModeOn = () => true;

const setSelectionModeOff = () => false;

const isSelectionMode = createReducer(defaultSelectionMode, { SET_SELECTIONMODE_ON: setSelectionModeOn, SET_SELECTIONMODE_OFF: setSelectionModeOff });

export default isSelectionMode;