import { UPDATE_STAGNANT_SELECTION_AREAS, RESET_STAGNANT_SELECTION_AREAS } from "@actionCreators";

export const updateStagnantSelectionAreas = (stagnantSelectionAreas) => ({ type: UPDATE_STAGNANT_SELECTION_AREAS, stagnantSelectionAreas });

export const resetStagnantSelectionAreas = () => ({ type: RESET_STAGNANT_SELECTION_AREAS });