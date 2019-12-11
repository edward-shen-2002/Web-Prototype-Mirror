import { UPDATE_CURSOR_TYPE, RESET_CURSOR_TYPE } from "actionCreators";

export const updateCursorType = (cursorType) => ({ type: UPDATE_CURSOR_TYPE, cursorType });
export const resetCursorType = () => ({ type: RESET_CURSOR_TYPE });
