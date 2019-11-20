import { UPDATE_FREEZE_ROW_COUNT, RESET_FREEZE_ROW_COUNT } from "actionCreators";

export const updateFreezeRowCount = (freezeRowCount) => ({ type: UPDATE_FREEZE_ROW_COUNT, freezeRowCount });

export const resetFreezeRowCount = () => ({ type: RESET_FREEZE_ROW_COUNT });