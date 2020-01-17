import { createReducer } from "@store/tools/setup";

const DEFAULT_CURSOR_TYPE = "default";

const UPDATE_CURSOR_TYPE = (_state, { cursorType }) => cursorType;

const RESET_CURSOR_TYPE = () => DEFAULT_CURSOR_TYPE;

const cursorTypeReducer = createReducer(DEFAULT_CURSOR_TYPE, { UPDATE_CURSOR_TYPE, RESET_CURSOR_TYPE });

export default cursorTypeReducer;
