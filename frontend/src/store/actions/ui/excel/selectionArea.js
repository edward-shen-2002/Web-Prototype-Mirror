import { UPDATE_SELECTION_AREA, RESET_SELECTION_AREA } from "actionCreators";

export const updateSelectionArea = (selectionArea) => ({ type: UPDATE_SELECTION_AREA, selectionArea });

export const resetSelectionArea = () => ({ type: RESET_SELECTION_AREA });