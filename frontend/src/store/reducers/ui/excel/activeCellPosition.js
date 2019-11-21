import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_CELL_POSITION } from "constants/excel";

const updateActiveCellPosition = (state, { activeCellPosition }) => ({ ...state, ...activeCellPosition });

const resetActiveCellPosition = () => DEFAULT_EXCEL_ACTIVE_CELL_POSITION;

const activeCellPositionReducer = createReducer(DEFAULT_EXCEL_ACTIVE_CELL_POSITION, { UPDATE_ACTIVE_CELL_POSITION: updateActiveCellPosition, RESET_ACTIVE_CELL_POSITION: resetActiveCellPosition });

export default activeCellPositionReducer;