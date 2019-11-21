import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_STAGNANT_SELECTION_AREAS } from "constants/excel";

const updateStagnantSelectionAreas = (_state, { stagnantSelectionAreas }) => [ ...stagnantSelectionAreas ];

const resetStagnantSelectionAreas = () => DEFAULT_EXCEL_STAGNANT_SELECTION_AREAS;

const stagnantSelectionAreasReducer = createReducer(DEFAULT_EXCEL_STAGNANT_SELECTION_AREAS, { UPDATE_STAGNANT_SELECTION_AREAS: updateStagnantSelectionAreas, RESET_STAGNANT_SELECTION_AREAS: resetStagnantSelectionAreas });

export default stagnantSelectionAreasReducer;