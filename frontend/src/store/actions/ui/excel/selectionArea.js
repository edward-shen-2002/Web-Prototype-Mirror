import { UPDATE_SELECTIONAREA, RESET_SELECTIONAREA } from "actionCreators";

export const updateSelectionArea = (selectionArea) => ({ type: UPDATE_SELECTIONAREA, selectionArea });

export const resetSelectionArea = () => ({ type: RESET_SELECTIONAREA });