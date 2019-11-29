import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SCROLL_DATA } from "constants/excel";

const UPDATE_SCROLL_DATA = (state, { scrollData }) => ({ ...state, ...scrollData });

const RESET_SCROLL_DATA = () => DEFAULT_EXCEL_SCROLL_DATA;

const scrollDataReducer = createReducer(DEFAULT_EXCEL_SCROLL_DATA, { 
  UPDATE_SCROLL_DATA, 
  RESET_SCROLL_DATA
});

export default scrollDataReducer;
