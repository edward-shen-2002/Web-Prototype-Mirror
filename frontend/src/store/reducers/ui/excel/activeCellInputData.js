import { createReducer } from "@store/tools/setup";

import {
  createEmptyEditor,
  createEmptyEditorValue
} from "@tools/slate";

const UPDATE_ACTIVE_CELL_INPUT_DATA = (state, { activeCellInputData }) => ({ ...state, ...activeCellInputData });

const RESET_ACTIVE_CELL_INPUT_DATA = () => ({
  cellEditor: createEmptyEditor(),
  formulaEditor: createEmptyEditor(),
  value: createEmptyEditorValue()
});

const activeCellInputDataReducer = createReducer(
  { 
    cellEditor: createEmptyEditor(),
    formulaEditor: createEmptyEditor(),
    value: createEmptyEditorValue()
  }, 
  { 
    UPDATE_ACTIVE_CELL_INPUT_DATA, 
    RESET_ACTIVE_CELL_INPUT_DATA 
  }
);

export default activeCellInputDataReducer;