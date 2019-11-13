import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SELECTION_AREA } from "constants/states";

const updateSelectionArea = (state, { selectionArea }) => ({ ...state, ...selectionArea });

const resetSelectionArea = () => ({ ...DEFAULT_EXCEL_SELECTION_AREA });

const selectionAreaReducer = createReducer(DEFAULT_EXCEL_SELECTION_AREA, { UPDATE_SELECTIONAREA: updateSelectionArea, RESET_SELECTIONAREA: resetSelectionArea });

export default selectionAreaReducer;