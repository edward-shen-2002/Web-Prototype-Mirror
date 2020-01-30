import { UPDATE_ACTIVE_CELL_DIALOG, RESET_ACTIVE_CELL_DIALOG } from "@actionCreators";

export const updateActiveCellDialog = (dialogType) => ({ type: UPDATE_ACTIVE_CELL_DIALOG, dialogType });
export const resetActiveCellDialog = () => ({ type: RESET_ACTIVE_CELL_DIALOG });
