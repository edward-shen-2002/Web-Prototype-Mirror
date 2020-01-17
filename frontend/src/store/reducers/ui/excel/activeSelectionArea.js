import { createReducer } from "@store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_SELECTION_AREA } from "@constants/excel";

const UPDATE_ACTIVE_SELECTION_AREA = (state, { activeSelectionArea }) => ({ ...state, ...activeSelectionArea });

const RESET_ACTIVE_SELECTION_AREA = () => null;

const activeSelectionAreaReducer = createReducer(DEFAULT_EXCEL_ACTIVE_SELECTION_AREA, { UPDATE_ACTIVE_SELECTION_AREA, RESET_ACTIVE_SELECTION_AREA });

export default activeSelectionAreaReducer;