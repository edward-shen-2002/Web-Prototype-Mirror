import { createReducer } from "store/tools/setup";

const SET_ACTIVE_CELL_INPUT_AUTO_FOCUS_ON = () => true;

const SET_ACTIVE_CELL_INPUT_AUTO_FOCUS_OFF = () => false;

const activeCellInputAutoFocusReducer = createReducer(true, { 
  SET_ACTIVE_CELL_INPUT_AUTO_FOCUS_ON, 
  SET_ACTIVE_CELL_INPUT_AUTO_FOCUS_OFF 
});

export default activeCellInputAutoFocusReducer;