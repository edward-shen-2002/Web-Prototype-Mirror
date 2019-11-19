import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_SELECTION_AREA } from "constants/excel";

const updateActiveSelectionArea = (state, { activeSelectionArea }) => ({ ...state, ...activeSelectionArea });

const resetActiveSelectionArea = () => null;

const activeSelectionAreaReducer = createReducer(DEFAULT_EXCEL_ACTIVE_SELECTION_AREA, { UPDATE_ACTIVESELECTIONAREA: updateActiveSelectionArea, RESET_ACTIVESELECTIONAREA: resetActiveSelectionArea });

export default activeSelectionAreaReducer;