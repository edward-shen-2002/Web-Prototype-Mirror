import { UPDATE_ACTIVE_CELL_POSITION, RESET_ACTIVE_CELL_POSITION } from "actionCreators";

export const updateActiveCellPosition = (activeCellPosition) => ({ type: UPDATE_ACTIVE_CELL_POSITION, activeCellPosition });

export const resetActiveCellPosition = () => ({ type: RESET_ACTIVE_CELL_POSITION });