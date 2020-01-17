import { createReducer } from "@store/tools/setup";

const ENABLE_COLUMN_RESIZE_MODE = () => true;

const DISABLE_COLUMN_RESIZE_MODE = () => false;

const isColumnResizeModeReducer = createReducer(false, { ENABLE_COLUMN_RESIZE_MODE, DISABLE_COLUMN_RESIZE_MODE });

export default isColumnResizeModeReducer;