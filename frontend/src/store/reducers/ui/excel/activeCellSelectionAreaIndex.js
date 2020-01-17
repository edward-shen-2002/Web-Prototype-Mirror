import { createReducer } from "@store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_CELL_SELECTION_AREA_INDEX } from "@constants/excel";

const UPDATE_ACTIVE_CELL_SELECTION_AREA_INDEX = (_state, { activeCellSelectionAreaIndex }) => activeCellSelectionAreaIndex;

const RESET_ACTIVE_CELL_SELECTION_AREA_INDEX = () => DEFAULT_EXCEL_ACTIVE_CELL_SELECTION_AREA_INDEX;

const activeCellSelectionAreaIndexReducer = createReducer(DEFAULT_EXCEL_ACTIVE_CELL_SELECTION_AREA_INDEX, { UPDATE_ACTIVE_CELL_SELECTION_AREA_INDEX, RESET_ACTIVE_CELL_SELECTION_AREA_INDEX });

export default activeCellSelectionAreaIndexReducer;
