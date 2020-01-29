import { createReducer } from "@store/tools/setup";

const UPDATE_SELECTED_COLUMNS = (state, { selectedColumns }) => ({ ...state, ...selectedColumns });
const RESET_SELECTED_COLUMNS = () => ({});

const selectedColumnsReducer = createReducer({}, {
  UPDATE_SELECTED_COLUMNS,
  RESET_SELECTED_COLUMNS
});

export default selectedColumnsReducer;