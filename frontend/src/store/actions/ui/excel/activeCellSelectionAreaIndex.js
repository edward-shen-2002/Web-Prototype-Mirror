import { UPDATE_ACTIVE_CELL_SELECTION_AREA_INDEX, RESET_ACTIVE_CELL_SELECTION_AREA_INDEX } from "actionCreators";

export const updateActiveCellSelectionAreaIndex = (activeCellSelectionAreaIndex) => ({ type: UPDATE_ACTIVE_CELL_SELECTION_AREA_INDEX, activeCellSelectionAreaIndex });
export const resetActiveCellSelectionAreaIndex = () => ({ type: RESET_ACTIVE_CELL_SELECTION_AREA_INDEX });