import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_SELECTION_AREA } from "constants/excel";

const updateActiveSelectionArea = (state, { activeSelectionArea }) => ({ ...state, ...activeSelectionArea });

const resetActiveSelectionArea = () => null;

const activeSelectionAreaReducer = createReducer(DEFAULT_EXCEL_ACTIVE_SELECTION_AREA, { UPDATE_ACTIVE_SELECTION_AREA: updateActiveSelectionArea, RESET_ACTIVE_SELECTION_AREA: resetActiveSelectionArea });

export default activeSelectionAreaReducer;