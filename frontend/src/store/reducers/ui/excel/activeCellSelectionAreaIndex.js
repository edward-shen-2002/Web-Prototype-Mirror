import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_CELL_SELECTION_AREA_INDEX } from "constants/excel";

const updateActiveCellSelectionAreaIndex = (_state, { activeCellSelectionAreaIndex }) => activeCellSelectionAreaIndex;

const resetActiveCellSelectionAreaIndex = () => DEFAULT_EXCEL_ACTIVE_CELL_SELECTION_AREA_INDEX;

const activeCellSelectionAreaIndexReducer = createReducer(DEFAULT_EXCEL_ACTIVE_CELL_SELECTION_AREA_INDEX, { UPDATE_ACTIVE_CELL_SELECTION_AREA_INDEX: updateActiveCellSelectionAreaIndex, RESET_ACTIVE_CELL_SELECTION_AREA_INDEX: resetActiveCellSelectionAreaIndex });

export default activeCellSelectionAreaIndexReducer;
