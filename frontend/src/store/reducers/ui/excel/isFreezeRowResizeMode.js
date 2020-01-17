import { createReducer } from "@store/tools/setup";

const ENABLE_FREEZE_ROW_RESIZE_MODE = () => true;

const DISABLE_FREEZE_ROW_RESIZE_MODE = () => false;

const isFreezeRowResizeModeReducer = createReducer(false, { ENABLE_FREEZE_ROW_RESIZE_MODE, DISABLE_FREEZE_ROW_RESIZE_MODE });

export default isFreezeRowResizeModeReducer;