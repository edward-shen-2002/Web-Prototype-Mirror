import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_STAGNANT_SELECTION_AREAS } from "constants/excel";

const UPDATE_STAGNANT_SELECTION_AREAS = (_state, { stagnantSelectionAreas }) => [ ...stagnantSelectionAreas ];

const RESET_STAGNANT_SELECTION_AREAS = () => DEFAULT_EXCEL_STAGNANT_SELECTION_AREAS;

const stagnantSelectionAreasReducer = createReducer(DEFAULT_EXCEL_STAGNANT_SELECTION_AREAS, { UPDATE_STAGNANT_SELECTION_AREAS, RESET_STAGNANT_SELECTION_AREAS });

export default stagnantSelectionAreasReducer;