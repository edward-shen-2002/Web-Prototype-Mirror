import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_CELL_ACTIVE } from "constants/states";

const updateActiveCell = (state, { activeCell }) => ({ ...state, activeCell });

const resetActiveCell = () => ({ ...DEFAULT_EXCEL_CELL_ACTIVE });

const activeCellReducer = createReducer(DEFAULT_EXCEL_CELL_ACTIVE, { UPDATE_ACTIVECELL: updateActiveCell, RESET_ACTIVECELL: resetActiveCell });

export default activeCellReducer;