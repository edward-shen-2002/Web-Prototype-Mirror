import { createReducer } from "store/tools/setup";

const UPDATE_COLUMN_RESIZE_DATA = (state, { columnResizeData }) => ({ ...state, ...columnResizeData });
const RESET_COLUMN_RESIZE_DATA = () => null;

const columnResizeDataReducer = createReducer(null, {
  UPDATE_COLUMN_RESIZE_DATA,
  RESET_COLUMN_RESIZE_DATA
});

export default columnResizeDataReducer;