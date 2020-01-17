import { UPDATE_ACTIVE_CELL_INPUT_DATA, RESET_ACTIVE_CELL_INPUT_DATA } from "@actionCreators";

export const updateActiveCellInputData = (activeCellInputData) => ({ type: UPDATE_ACTIVE_CELL_INPUT_DATA, activeCellInputData });

export const resetActiveCellInputData = () => ({ type: RESET_ACTIVE_CELL_INPUT_DATA });