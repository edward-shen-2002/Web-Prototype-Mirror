import { createReducer } from "@store/tools/setup";

const UPDATE_EXCEL_TYPE = (_state, { excelType }) => excelType;
const RESET_EXCEL_TYPE = () => "";

const typeReducer = createReducer("", {
  UPDATE_EXCEL_TYPE,
  RESET_EXCEL_TYPE
});

export default typeReducer;
