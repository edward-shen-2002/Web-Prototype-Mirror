import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ACTIVE_CELL_POSITION } from "constants/excel";

const UPDATE_ACTIVE_CELL_POSITION = (state, { activeCellPosition }) => ({ ...state, ...activeCellPosition });

const RESET_ACTIVE_CELL_POSITION = () => DEFAULT_EXCEL_ACTIVE_CELL_POSITION;

const activeCellPositionReducer = createReducer(DEFAULT_EXCEL_ACTIVE_CELL_POSITION, { UPDATE_ACTIVE_CELL_POSITION, RESET_ACTIVE_CELL_POSITION });

export default activeCellPositionReducer;