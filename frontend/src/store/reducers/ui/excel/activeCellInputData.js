import { createReducer } from "@store/tools/setup";

import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";

const UPDATE_ACTIVE_CELL_INPUT_DATA = (state, { activeCellInputData }) => ({ ...state, ...activeCellInputData });

const RESET_ACTIVE_CELL_INPUT_DATA = () => ({
  editor: withHistory(withReact(createEditor())),
  value: [ 
    { 
      type: "paragraph", 
      children: [ { text: "" } ] 
    } 
  ] 
});

const activeCellInputDataReducer = createReducer(
  { 
    editor: withHistory(withReact(createEditor())),
    value: [ 
      { 
        type: "paragraph", 
        children: [ { text: "" } ] 
      } 
    ] 
  }, 
  { 
    UPDATE_ACTIVE_CELL_INPUT_DATA, 
    RESET_ACTIVE_CELL_INPUT_DATA 
  }
);

export default activeCellInputDataReducer;