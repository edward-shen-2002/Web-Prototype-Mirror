import { createReducer } from "@store/tools/setup";

const UPDATE_SELECTED_ROWS = (state, { selectedRows }) => ({ ...state, ...selectedRows });
const RESET_SELECTED_ROWS = () => ({});

const selectedRowsReducer = createReducer({}, {
  UPDATE_SELECTED_ROWS,
  RESET_SELECTED_ROWS
});

export default selectedRowsReducer;