import { ENABLE_FREEZE_ROW_RESIZE_MODE, DISABLE_FREEZE_ROW_RESIZE_MODE } from "@actionCreators";

export const enableFreezeRowResizeMode = () => ({ type: ENABLE_FREEZE_ROW_RESIZE_MODE });
export const disableFreezeRowResizeMode = () => ({ type: DISABLE_FREEZE_ROW_RESIZE_MODE });
