import { createReducer } from "store/tools/setup";

const UPDATE_WORKBOOK_NAME = (_state, { name }) => name;
const RESET_WORKBOOK_NAME = () => "";

const nameReducer = createReducer(null, {
  UPDATE_WORKBOOK_NAME,
  RESET_WORKBOOK_NAME
});

export default nameReducer;