import { UPDATE_ACTIVE_SELECTION_AREA, RESET_ACTIVE_SELECTION_AREA } from "actionCreators";

export const updateActiveSelectionArea = (activeSelectionArea) => ({ type: UPDATE_ACTIVE_SELECTION_AREA, activeSelectionArea });

export const resetActiveSelectionArea = () => ({ type: RESET_ACTIVE_SELECTION_AREA });