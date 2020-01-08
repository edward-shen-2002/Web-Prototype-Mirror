import { createReducer } from "store/tools/setup";

const ENABLE_FREEZE_COLUMN_RESIZE_MODE = () => true;

const DISABLE_FREEZE_COLUMN_RESIZE_MODE = () => false;

const isFreezeColumnResizeModeReducer = createReducer(false, { ENABLE_FREEZE_COLUMN_RESIZE_MODE, DISABLE_FREEZE_COLUMN_RESIZE_MODE });

export default isFreezeColumnResizeModeReducer;