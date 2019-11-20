import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SELECTION_AREA } from "constants/excel";

const updateSelectionArea = (state, { selectionArea }) => ({ ...state, ...selectionArea });

const resetSelectionArea = () => ({ ...DEFAULT_EXCEL_SELECTION_AREA });

const selectionAreaReducer = createReducer(DEFAULT_EXCEL_SELECTION_AREA, { UPDATE_SELECTION_AREA: updateSelectionArea, RESET_SELECTION_AREA: resetSelectionArea });

export default selectionAreaReducer;