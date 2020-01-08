import { createReducer } from "store/tools/setup";

const defaultSelectionMode = false;

const SET_SELECTION_MODE_ON = () => true;

const DISABLE_SELECTION_MODE = () => false;

const isSelectionMode = createReducer(defaultSelectionMode, { SET_SELECTION_MODE_ON, DISABLE_SELECTION_MODE });

export default isSelectionMode;