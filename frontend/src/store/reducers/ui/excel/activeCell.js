import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_CELL_ACTIVE } from "constants/excel";

const updateActiveCellPosition = (state, { activeCellPosition }) => ({ ...state, ...activeCellPosition });

const resetActiveCellPosition = () => null;

const activeCellPositionReducer = createReducer(DEFAULT_EXCEL_CELL_ACTIVE, { UPDATE_ACTIVE_CELL_POSITION: updateActiveCellPosition, RESET_ACTIVE_CELL_POSITION: resetActiveCellPosition });

export default activeCellPositionReducer;