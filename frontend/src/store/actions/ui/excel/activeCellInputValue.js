import { UPDATE_ACTIVE_CELL_INPUT_VALUE, RESET_ACTIVE_CELL_INPUT_VALUE } from "actionCreators";

export const updateActiveCellInputValue = (activeCellInputValue) => ({ type: UPDATE_ACTIVE_CELL_INPUT_VALUE, activeCellInputValue });

export const resetActiveCellInputValue = () => ({ type: RESET_ACTIVE_CELL_INPUT_VALUE });