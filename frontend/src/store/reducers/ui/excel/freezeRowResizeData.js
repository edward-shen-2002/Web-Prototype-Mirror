import { createReducer } from "store/tools/setup";

const UPDATE_FREEZE_ROW_RESIZE_DATA = (state, { freezeRowResizeData }) => ({ ...state, freezeRowResizeData });
const RESET_FREEZE_ROW_RESIZE_DATA = () => null;

const freezeRowResizeDataReducer = createReducer(null, {
  UPDATE_FREEZE_ROW_RESIZE_DATA,
  RESET_FREEZE_ROW_RESIZE_DATA
});

export default freezeRowResizeDataReducer;