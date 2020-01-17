import { createReducer } from "@store/tools/setup";

const UPDATE_FREEZE_COLUMN_RESIZE_DATA = (state, { freezeColumnResizeData }) => ({ ...state, ...freezeColumnResizeData });
const RESET_FREEZE_COLUMN_RESIZE_DATA = () => null;

const freezeColumnResizeDataReducer = createReducer(null, {
  UPDATE_FREEZE_COLUMN_RESIZE_DATA,
  RESET_FREEZE_COLUMN_RESIZE_DATA
});

export default freezeColumnResizeDataReducer;