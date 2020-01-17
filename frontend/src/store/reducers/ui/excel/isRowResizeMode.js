import { createReducer } from "@store/tools/setup";

const ENABLE_ROW_RESIZE_MODE = () => true;

const DISABLE_ROW_RESIZE_MODE = () => false;

const isRowResizeModeReducer = createReducer(false, { ENABLE_ROW_RESIZE_MODE, DISABLE_ROW_RESIZE_MODE });

export default isRowResizeModeReducer;