import { createReducer } from "@store/tools/setup";

const OPEN_COMMENT_DIALOG = () =>  true;

const CLOSE_COMMENT_DIALOG = () => false;

const isCommentDialogOpenReducer = createReducer(false, { OPEN_COMMENT_DIALOG, CLOSE_COMMENT_DIALOG });

export default isCommentDialogOpenReducer;