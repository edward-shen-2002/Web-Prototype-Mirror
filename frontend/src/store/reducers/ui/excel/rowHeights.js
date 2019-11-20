import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ROW_HEIGHTS } from "constants/excel";

const updateRowHeights = (_state, { rowHeights }) => [ ...rowHeights ];

const resetRowHeights = () => DEFAULT_EXCEL_ROW_HEIGHTS;

const rowHeightsReducer = createReducer(DEFAULT_EXCEL_ROW_HEIGHTS, { UPDATE_ROW_HEIGHTS: updateRowHeights, RESET_ROW_HEIGHTS: resetRowHeights });

export default rowHeightsReducer;