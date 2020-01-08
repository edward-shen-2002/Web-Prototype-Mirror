import { ENABLE_FREEZE_COLUMN_RESIZE_MODE, DISABLE_FREEZE_COLUMN_RESIZE_MODE } from "actionCreators";

export const enableFreezeColumnResizeMode = () => ({ type: ENABLE_FREEZE_COLUMN_RESIZE_MODE });
export const disableFreezeColumnResizeMode = () => ({ type: DISABLE_FREEZE_COLUMN_RESIZE_MODE });
