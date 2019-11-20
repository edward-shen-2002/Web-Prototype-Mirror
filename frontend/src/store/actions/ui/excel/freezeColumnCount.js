import { UPDATE_FREEZE_COLUMN_COUNT, RESET_FREEZE_COLUMN_COUNT } from "actionCreators";

export const updateFreezeColumnCount = (freezeColumnCount) => ({ type: UPDATE_FREEZE_COLUMN_COUNT, freezeColumnCount });

export const resetFreezeColumnCount = () => ({ type: RESET_FREEZE_COLUMN_COUNT });