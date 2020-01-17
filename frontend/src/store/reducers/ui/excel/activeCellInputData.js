import { createReducer } from "@store/tools/setup";

import { EditorState, ContentState } from "draft-js";

const UPDATE_ACTIVE_CELL_INPUT_DATA = (_state, { activeCellInputData: { editorState: newEditorState, rawText: newRawText } }) => {
  let editorState;
  let rawText;

  if(newEditorState && newRawText) {
    editorState = newEditorState;
    rawText = newRawText;
  } else if(newEditorState) {
    editorState = newEditorState;
    rawText = newEditorState.getCurrentContent().getPlainText();
  } else {
    rawText = newRawText;
    editorState = EditorState.createWithContent(ContentState.createFromText(newRawText));
  }

  return {
    editorState,
    rawText
  };
};

const RESET_ACTIVE_CELL_INPUT_DATA = () => ({
  editorState: EditorState.createEmpty(),
  rawText: ""
});

const activeCellInputDataReducer = createReducer(
  { 
    editorState: EditorState.createEmpty(), 
    rawText: "" 
  }, 
  { 
    UPDATE_ACTIVE_CELL_INPUT_DATA, 
    RESET_ACTIVE_CELL_INPUT_DATA 
  }
);

export default activeCellInputDataReducer;