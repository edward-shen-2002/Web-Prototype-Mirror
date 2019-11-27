import { createReducer } from "store/tools/setup";

const UPDATE_ACTIVE_CELL_INPUT_VALUE = (_state, { activeCellInputValue }) => activeCellInputValue;

const RESET_ACTIVE_CELL_INPUT_VALUE = () => "";

const activeCellInputValueReducer = createReducer("", { 
  UPDATE_ACTIVE_CELL_INPUT_VALUE, 
  RESET_ACTIVE_CELL_INPUT_VALUE 
});

export default activeCellInputValueReducer;