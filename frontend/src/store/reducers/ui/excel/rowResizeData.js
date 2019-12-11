import { createReducer } from "store/tools/setup";

const UPDATE_ROW_RESIZE_DATA = (state, { rowResizeData }) => ({ ...state, ...rowResizeData });
const RESET_ROW_RESIZE_DATA = () => null;

const rowResizeDataReducer = createReducer(null, {
  UPDATE_ROW_RESIZE_DATA,
  RESET_ROW_RESIZE_DATA
});

export default rowResizeDataReducer;