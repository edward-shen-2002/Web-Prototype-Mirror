import { createReducer } from "@store/tools/setup";

const ENABLE_ACTIVE_CELL_INPUT_AUTO_FOCUS = () => true;

const DISABLE_ACTIVE_CELL_INPUT_AUTO_FOCUS = () => false;

const activeCellInputAutoFocusReducer = createReducer(true, { 
  ENABLE_ACTIVE_CELL_INPUT_AUTO_FOCUS, 
  DISABLE_ACTIVE_CELL_INPUT_AUTO_FOCUS 
});

export default activeCellInputAutoFocusReducer;