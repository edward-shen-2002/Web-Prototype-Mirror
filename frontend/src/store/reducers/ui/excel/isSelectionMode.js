import { createReducer } from "store/tools/setup";

const defaultIsSelectionMode = false;

const setIsSelectionModeOn = () => true;

const setIsSelectionModeOff = () => false;

const isSelectionMode = createReducer(defaultIsSelectionMode, { SET_SELECTIONMODE_ON: setIsSelectionModeOn, SET_SELECTIONMODE_OFF: setIsSelectionModeOff });

export default isSelectionMode;